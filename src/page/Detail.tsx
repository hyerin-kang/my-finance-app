import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router";
import { Label } from "@radix-ui/react-label";
import { Input } from "../components/ui/input";
import { Button } from "../components/ui/button";
import { supabase } from "../utils/supabase";
import { Tables } from "../../database.types";
import { getDetailData } from "../api/expense-api";
import { useQuery } from "@tanstack/react-query";

const Detail = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();

  const { data, isPending, isError } = useQuery({
    queryKey: ["expenses", id],
    queryFn: async () => {
      if (id) {
        const res = await getDetailData(id);
        return res;
      }
    },
  });

  const [formData, setFormData] = useState<Tables<"expenses"> | null>(null);

  useEffect(() => {
    if (data) {
      setFormData(data);
    }
  }, [data]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    if (formData) {
      setFormData({
        ...formData,
        [name]: value,
      });
    }
  };

  const handleDelete = async (id: Tables<"expenses">["id"]) => {
    const isConfirm = window.confirm("정말 삭제할까요?");
    if (!isConfirm) return;
    await supabase.from("expenses").delete().eq("id", id);
    navigate("/");
  };

  const handleUpdate = async (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>,
    id: Tables<"expenses">["id"]
  ) => {
    e.preventDefault();

    // const isChanged = expense !== formData;
    // if (!isChanged) {
    //   return alert("수정사항이 없습니다");
    // }
    if (!formData) return;

    if (formData == data) {
      return alert("수정사항이 없습니다");
    }

    const { error } = await supabase
      .from("expenses")
      .update({
        date: formData?.date,
        item: formData?.item,
        amount: formData?.amount,
        description: formData?.description,
      })
      .eq("id", id);

    if (error) {
      return alert(error.message);
    }
    navigate("/");
  };

  if (isPending) {
    return <div>로딩중...</div>;
  }

  if (isError) {
    return <div>데이터 조회 중 오류가 발생했습니다.</div>;
  }

  return formData ? (
    <div className="rounded-md shadow-md p-4">
      <form className="space-y-4">
        <div className="grid items-center gap-1.5  flex-1 w-full">
          <Label htmlFor="date">날짜</Label>
          <Input
            type="date"
            id="date"
            name="date"
            value={formData.date}
            onChange={handleChange}
          />
        </div>
        <div className="grid items-center gap-1.5  flex-1 w-full">
          <Label htmlFor="item">항목</Label>
          <Input
            type="text"
            id="item"
            name="item"
            value={formData.item}
            onChange={handleChange}
          />
        </div>
        <div className="grid items-center gap-1.5  flex-1 w-full">
          <Label htmlFor="amount">금액</Label>
          <Input
            type="number"
            id="amount"
            name="amount"
            value={formData.amount}
            onChange={handleChange}
          />
        </div>
        <div className="grid items-center gap-1.5  flex-1 w-full">
          <Label htmlFor="description">내용</Label>
          <Input
            type="text"
            id="description"
            name="description"
            value={formData.description}
            onChange={handleChange}
          />
        </div>
        <div className="space-x-2">
          <Button
            type="submit"
            onClick={(e) => {
              handleUpdate(e, formData.id);
            }}
          >
            수정
          </Button>
          <Button
            type="button"
            onClick={() => {
              handleDelete(formData.id);
            }}
            variant="destructive"
          >
            삭제
          </Button>
          <Link to="/">
            <Button variant="outline">뒤로가기</Button>
          </Link>
        </div>
      </form>
    </div>
  ) : (
    <div>해당 데이터가 없습니다</div>
  );
};

export default Detail;
