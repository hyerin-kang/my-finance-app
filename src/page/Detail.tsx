import { useEffect, useState } from "react";
import { Link, useParams } from "react-router";
import { supabase } from "../utils/supabase";
import { Label } from "@radix-ui/react-label";
import { Input } from "../components/ui/input";
import { Button } from "../components/ui/button";
interface Expense {
  id: string;
  date: string;
  item: string;
  amount: number;
  description: string;
}
const Detail = () => {
  const [expenseList, setExpenseList] = useState<Expense[]>([]);
  //   const fetchData =
  useEffect(() => {
    const getExpenseData = async () => {
      try {
        const { data, error } = await supabase.from("expenses").select("*");
        if (error) throw error;
        setExpenseList(data);
      } catch (error) {
        console.log(error);
      }
    };
    getExpenseData();
  }, []);
  const param = useParams();
  const detailInfo = expenseList.find((item) => item.id === param.id);
  console.log(detailInfo);
  return (
    <div className="rounded-md shadow-md p-4">
      상세페이지
      <form className="space-y-4">
        <div className="grid items-center gap-1.5  flex-1 w-full">
          <Label htmlFor="date">날짜</Label>
          <Input type="date" id="date" placeholder={detailInfo?.item} />
        </div>
        <div className="grid items-center gap-1.5  flex-1 w-full">
          <Label htmlFor="item">항목</Label>
          <Input type="text" id="item" placeholder={detailInfo?.item} />
        </div>
        <div className="grid items-center gap-1.5  flex-1 w-full">
          <Label htmlFor="amount">금액</Label>
          <Input
            type="number"
            id="amount"
            placeholder={detailInfo?.amount.toString()}
          />
        </div>
        <div className="grid items-center gap-1.5  flex-1 w-full">
          <Label htmlFor="description">내용</Label>
          <Input
            type="text"
            id="description"
            placeholder={detailInfo?.description}
          />
        </div>
        <div className="space-x-2">
          <Button>수정</Button>
          <Button>삭제</Button>
          <Link to="/">
            <Button>뒤로가기</Button>
          </Link>
        </div>
      </form>
    </div>
  );
};

export default Detail;
