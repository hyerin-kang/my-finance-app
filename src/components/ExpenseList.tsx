import { useEffect, useState } from "react";
import { supabase } from "../utils/supabase";
import { Link, useSearchParams } from "react-router";
import { Tables } from "../../database.types";

const ExpenseList = () => {
  const [expenseList, setExpenseList] = useState<Tables<"expenses">[]>([]);
  const [searchParams] = useSearchParams();

  const selectedFilter = searchParams.get("month") || "1";
  const monthToTwo = selectedFilter?.padStart(2, "0");

  const amountToWon = (amount: number) => {
    return new Intl.NumberFormat("ko-KR").format(amount);
  };

  useEffect(() => {
    const getExpenseData = async () => {
      try {
        const { data, error } = await supabase
          .from("expenses")
          .select("*")
          .order("date", { ascending: false })
          .like("date", `%-${monthToTwo}-%`);
        if (error) throw error;
        setExpenseList(data);
      } catch (error) {
        console.log(error);
      }
    };
    getExpenseData();
  }, [monthToTwo]);

  return (
    <div className="shadow-md p-4 rounded-md space-y-4">
      {expenseList.length > 0 ? (
        expenseList.map(function (item) {
          return (
            <Link
              to={`/detail/${item.id}`}
              key={item.id}
              className="flex items-center justify-between p-4 rounded-md bg-gray-50 border-1"
            >
              <div>
                <div className="text-sm text-gray-500">{item.date}</div>
                <div className="text-lg font-bold text-blue-500">
                  {item.item} - {item.description}
                </div>
              </div>
              <div className="text-lg font-bold text-blue-500">
                {amountToWon(item.amount)}원
              </div>
            </Link>
          );
        })
      ) : (
        <div className="text-center text-gray-500">
          {monthToTwo}월 데이터가 없습니다
        </div>
      )}
    </div>
  );
};

export default ExpenseList;
