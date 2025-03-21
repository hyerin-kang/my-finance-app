import { useEffect, useState } from "react";
import { Link, useParams } from "react-router";
import { Label } from "@radix-ui/react-label";
import { Input } from "../components/ui/input";
import { Button } from "../components/ui/button";
import { supabase } from "../utils/supabase";
import { Database } from "../../database.types";

const Detail = () => {
  type Expenses = Database["public"]["Tables"]["expenses"]["Row"];
  const [expense, setExpense] = useState<Expenses | null>(null);
  const { id } = useParams();

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
        }
      } catch (error) {
        console.log(error);
      }
    };
    getExpenseData();
  }, [id]);

  return (
    <div className="rounded-md shadow-md p-4">
      상세페이지
      <form className="space-y-4">
        <div className="grid items-center gap-1.5  flex-1 w-full">
          <Label htmlFor="date">날짜</Label>
          <Input type="date" id="date" placeholder={expense?.item} />
        </div>
        <div className="grid items-center gap-1.5  flex-1 w-full">
          <Label htmlFor="item">항목</Label>
          <Input type="text" id="item" placeholder={expense?.item} />
        </div>
        <div className="grid items-center gap-1.5  flex-1 w-full">
          <Label htmlFor="amount">금액</Label>
          <Input
            type="number"
            id="amount"
            placeholder={expense?.amount.toString()}
          />
        </div>
        <div className="grid items-center gap-1.5  flex-1 w-full">
          <Label htmlFor="description">내용</Label>
          <Input
            type="text"
            id="description"
            placeholder={expense?.description}
          />
        </div>
        <div className="space-x-2">
          <Button>수정</Button>
          <Button variant="destructive">삭제</Button>
          <Link to="/">
            <Button variant="outline">뒤로가기</Button>
          </Link>
        </div>
      </form>
    </div>
  );
};

export default Detail;
