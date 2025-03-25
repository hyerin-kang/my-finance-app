import { Tables } from "../../database.types";
import { supabase } from "../utils/supabase";

export const getExpensesData = async(filter:string):Promise<Tables<"expenses">[]>=>{
    const monthToTwo = filter.padStart(2, "0");
    const { data,error } = await supabase.from('expenses').select("*").order("date", { ascending: false }).like("date", `%-${monthToTwo}-%`);

    if(error){
      console.log(error)
      return []
    };
    return data;
}