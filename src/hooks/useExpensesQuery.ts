import {  useMutation, useQuery, useQueryClient } from "@tanstack/react-query"
import { addExpenseData, getDetailData, getExpensesData, handleDelete, handleUpdate } from "../api/expense-api";
import { Tables } from "../../database.types";
import { useNavigate, useSearchParams } from "react-router";

//전체목록 가져오기
export const useListQuery = ()=>{
    const [searchParams] = useSearchParams();
    const selectedFilter = searchParams.get("month") || "1";
    return useQuery({
        queryKey: ["expenses", selectedFilter],
        queryFn: () => getExpensesData(selectedFilter),
    })
}

// 상세페이지 데이터 가져오기
export const useDetailQuery = (id:string)=>{
    return useQuery({
        queryKey: ["expenses",id],
        queryFn: async () => {
            const res = await getDetailData(id);
            return res;
        },
    })
}

//추가하기
export const useAddMutation = ()=>{
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: addExpenseData,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["expenses"] });
            alert("가계부가 추가되었습니다");
        },
    })
}

//수정하기
export const useUpdateMutation = ()=>{
    const queryClient = useQueryClient();
    const navigate = useNavigate();
    return useMutation({
         mutationFn: ({id,formData}: {id: Tables<"expenses">["id"];formData: Tables<"expenses">;}) =>
            handleUpdate(id, formData),
            onSuccess: () => {
              queryClient.invalidateQueries({ queryKey: ["expenses"] });
              alert("수정완료");
              navigate("/");
            },
            onError: (error) => {
              alert(`수정중 오류가 발생하였습니다 : ${error.message}`);
            },
    })
}

//삭제하기
export const useDeleteMutation = ()=>{
    const navigate = useNavigate();
    return useMutation({
        mutationFn: (id: Tables<"expenses">["id"]) => handleDelete(id),
        onSuccess: () => {
            alert("삭제되었습니다");
            navigate("/");
        },
        onError: (error) => {
            alert(`삭제중 오류가 발생하였습니다 : ${error.message}`);
        },
    })
}