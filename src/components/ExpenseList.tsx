import { useEffect, useState } from "react";
import { supabase } from "../utils/supabase";
import { Link } from "react-router";
import { Database } from "./../../database.types";

const ExpenseList = () => {
  type Expenses = Database["public"]["Tables"]["expenses"]["Row"];

  const [expenseList, setExpenseList] = useState<Expenses[]>([]);

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
  }, [expenseList]);

  return (
    <div className="shadow-md p-4 rounded-md space-y-4">
      ExpenseList
      {expenseList.map(function (item) {
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
            <div className="text-lg font-bold text-blue-500">{item.amount}</div>
          </Link>
        );
      })}
    </div>
  );
};

export default ExpenseList;
