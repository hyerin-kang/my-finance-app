import { Tables, TablesInsert } from "../../database.types";
import { supabase } from "../utils/supabase";

//전체 데이터 불러오기
export const getExpensesData = async (filter: string) => {
  const padedMonth = filter.padStart(2, "0");
  const { data, error } = await supabase
    .from("expenses")
    .select("*")
    .order("date", { ascending: true })
    .like("date", `%-${padedMonth}-%`);
  if (error) throw new Error(error.message);
  return data;
};

//데이터 추가 로직
export const addExpenseData = async (data: TablesInsert<"expenses">) => {
  const { error } = await supabase.from("expenses").insert(data);
  if (error) throw new Error(error.message);
};

//상세페이지 데이터 가져오기
export const getDetailData = async (id: string) => {
  const { data, error } = await supabase
    .from("expenses")
    .select("*")
    .eq("id", id)
    .single();
  if (error) throw new Error(error.message);
  return data;
};

//상세페이지 정보 수정
export const handleUpdate = async (
  id: Tables<"expenses">["id"],
  formData: Tables<"expenses">,
) => {
  const { error } = await supabase
    .from("expenses")
    .update({
      date: formData?.date,
      item: formData?.item,
      amount: formData?.amount,
      description: formData?.description,
    })
    .eq("id", id);
  if (error) throw new Error(error.message);
};

//상세페이지 정보 삭제
export const handleDelete = async (id: Tables<"expenses">["id"]) => {
  await supabase.from("expenses").delete().eq("id", id);
};
