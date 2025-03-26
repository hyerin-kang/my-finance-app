import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router";
import { Label } from "@radix-ui/react-label";
import { Input } from "../components/ui/input";
import { Button } from "../components/ui/button";
import { Tables } from "../../database.types";
import { getDetailData, handleDelete, handleUpdate } from "../api/expense-api";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

const Detail = () => {
  const queryClient = useQueryClient();
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [formData, setFormData] = useState<Tables<"expenses"> | null>(null);

  const { data, isPending, isError } = useQuery({
    queryKey: ["expenses", id],
    queryFn: async () => {
      if (id) {
        const res = await getDetailData(id);
        return res;
      }
    },
  });

  const { mutate: updateMutate } = useMutation({
    mutationFn: ({
      id,
      formData,
    }: {
      id: Tables<"expenses">["id"];
      formData: Tables<"expenses">;
    }) => handleUpdate(id, formData),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["expenses"] });
      navigate("/");
    },
    onError: (error) => {
      alert(`수정중 오류가 발생하였습니다 : ${error.message}`);
    },
  });

  const { mutate: deleteMutate } = useMutation({
    mutationFn: (id: Tables<"expenses">["id"]) => handleDelete(id),
    onSuccess: () => {
      const isConfirm = window.confirm("정말 삭제할까요?");
      if (!isConfirm) return;
      navigate("/");
    },
    onError: (error) => {
      alert(`삭제중 오류가 발생하였습니다 : ${error.message}`);
    },
  });

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

  const handleUpdateBtn = (
    id: Tables<"expenses">["id"],
    formData: Tables<"expenses">
  ) => {
    updateMutate({ id, formData });
  };

  const handleDeleteBtn = (id: Tables<"expenses">["id"]) => {
    deleteMutate(id);
  };

  if (isPending) {
    return <div>로딩중...</div>;
  }

  if (isError) {
    return <div>데이터 조회 중 오류가 발생했습니다.</div>;
  }

  if (!formData) {
    return <div>해당 데이터가 없습니다</div>;
  }

  return (
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
            type="button"
            onClick={() => {
              handleUpdateBtn(id as string, formData);
            }}
          >
            수정
          </Button>
          <Button
            type="button"
            onClick={() => {
              handleDeleteBtn(formData.id as string);
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
  );
};

export default Detail;
