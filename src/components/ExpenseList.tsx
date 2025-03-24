import { useEffect, useState } from "react";
import { supabase } from "../utils/supabase";
import { Link, useSearchParams } from "react-router";
import { Database } from "./../../database.types";

const ExpenseList = () => {
  type Expenses = Database["public"]["Tables"]["expenses"]["Row"];

  const [expenseList, setExpenseList] = useState<Expenses[]>([]);
  const [searchParams] = useSearchParams();

  const selectedFilter = searchParams.get("month");
  const monthToTwo = selectedFilter?.padStart(2, "0");

  useEffect(() => {
    const getExpenseData = async () => {
      try {
        const { data, error } = await supabase
          .from("expenses")
          .select("*")
          .like("date", `%-${monthToTwo}-%`);
        if (error) throw error;
        setExpenseList(data);
      } catch (error) {
        console.log(error);
      }
    };
    getExpenseData();
  }, [selectedFilter]);

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
                {item.amount}
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
