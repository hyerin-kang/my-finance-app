import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router";
import { Label } from "@radix-ui/react-label";
import { Input } from "../components/ui/input";
import { Button } from "../components/ui/button";
import { supabase } from "../utils/supabase";
import { Tables } from "../../database.types";

const Detail = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [expense, setExpense] = useState<Tables<"expenses"> | null>(null);
  const [formData, setFormData] = useState<Tables<"expenses">>({
    id: "",
    date: "",
    item: "",
    amount: 0,
    description: "",
  });

  useEffect(() => {
    const getExpenseData = async () => {
      try {
        if (id) {
          const { data, error } = await supabase
            .from("expenses")
            .select("*")
            .eq("id", id)
            .single();
          if (error) throw error;
          setExpense(data);
          setFormData(data);
        }
      } catch (error) {
        console.log(error);
      }
    };
    getExpenseData();
  }, [id]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleDelete = async (id: Tables<"expenses">["id"]) => {
    const isConfirm = window.confirm("정말 삭제할까요?");
    if (!isConfirm) return;
    await supabase.from("expenses").delete().eq("id", id);
    navigate("/");
  };

  return expense && formData ? (
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
          <Button>수정</Button>
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
