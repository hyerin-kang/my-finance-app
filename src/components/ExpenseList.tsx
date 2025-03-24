import { useEffect, useState } from "react";
import { supabase } from "../utils/supabase";
import { Link, useSearchParams } from "react-router";
import { Database } from "./../../database.types";

const ExpenseList = () => {
  type Expenses = Database["public"]["Tables"]["expenses"]["Row"];

  const [expenseList, setExpenseList] = useState<Expenses[]>([]);
  const [searchParams] = useSearchParams();

  const selectedFilter = searchParams.get("month");

  useEffect(() => {
    console.log("selectedFilter", selectedFilter);

    //[{"id": "069a8456-d05c-48d6-bc35-e83317cdc9d3","date": "2025-03-20","item": "식비","amount": 20000,"description": "양꼬치"}]
    //date: "2025-03-19"
    const date = expenseList.map(function (item) {
      return item.date;
    });
    //["2025-03-20"]
    const dateMonth = date.map(function (item) {
      return item.split("-")[1];
    });
    //'[03]'
    // console.log(dateMonth);
  }, [selectedFilter]);

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
