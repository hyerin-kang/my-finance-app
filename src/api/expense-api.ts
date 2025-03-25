import { Tables, TablesInsert } from "../../database.types";
import { supabase } from "../utils/supabase";

//전체 데이터 불러오기
export const getExpensesData = async(filter:string):Promise<Tables<"expenses">[]>=>{
    const monthToTwo = filter.padStart(2, "0");
    const { data,error } = await supabase.from('expenses').select("*").order("date", { ascending: false }).like("date", `%-${monthToTwo}-%`);

    if(error){
      console.log(error)
      return [];
    };
    return data;
}

//데이터 추가 로직
export const addExpenseData = async(data:TablesInsert<'expenses'>)=>{
    const { error } = await supabase.from("expenses").insert(data).select();
    alert("가계부가 추가 되었습니다.");
    window.location.reload();
    if (error) {
      return console.log(error)
    };
}

//상세페이지 데이터 가져오기
export const getDetailData = async(id:string)=>{
  try {
    if (id) {
      const { data, error } = await supabase
        .from("expenses")
        .select("*")
        .eq("id", id)
        .single();
      if (error) throw error;
      return data;
    }
  } catch (error) {
    console.log(error);
  }
}