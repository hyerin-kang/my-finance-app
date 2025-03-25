import { Tables, TablesInsert } from "../../database.types";
import { supabase } from "../utils/supabase";

export const getExpensesData = async(filter:string):Promise<Tables<"expenses">[]>=>{
    const monthToTwo = filter.padStart(2, "0");
    const { data,error } = await supabase.from('expenses').select("*").order("date", { ascending: false }).like("date", `%-${monthToTwo}-%`);

    if(error){
      console.log(error)
      return [];
    };
    return data;
}

export const addExpenseData = async(data:TablesInsert<'expenses'>)=>{
    const { error } = await supabase.from("expenses").insert(data).select();
    alert("가계부가 추가 되었습니다.");
    window.location.reload();
    if (error) {
      return console.log(error)
    };
}