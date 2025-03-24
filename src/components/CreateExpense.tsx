import { Label } from "@radix-ui/react-label";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import { supabase } from "../utils/supabase";

const CreateExpense = () => {
  const addExpense = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const formData = new FormData(e.currentTarget);
    const data = {
      date: formData.get("date") as string,
      item: formData.get("item") as string,
      amount: Number(formData.get("amount")) as number,
      description: formData.get("description") as string,
    };

    if (!data.date || !data.item || !data.amount || !data.description) {
      return alert("정보를 모두 입력해주세요");
    }
    e.currentTarget.reset();
    try {
      const { error } = await supabase.from("expenses").insert(data);
      alert("가계부가 추가 되었습니다.");
      if (error) throw error;
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <form
      onSubmit={addExpense}
      className="p-4 shadow-md rounded-md flex-col sm:flex-row flex flex-wrap gap-4 items-end"
    >
      <div className="grid items-center gap-1.5  flex-1 w-full">
        <Label htmlFor="date">날짜</Label>
        <Input type="date" id="date" name="date" placeholder="날짜" />
      </div>
      <div className="grid items-center gap-1.5  flex-1 w-full">
        <Label htmlFor="item">항목</Label>
        <Input type="text" id="item" name="item" placeholder="지출항목" />
      </div>
      <div className="grid items-center gap-1.5  flex-1 w-full">
        <Label htmlFor="amount">금액</Label>
        <Input
          type="number"
          id="amount"
          name="amount"
          placeholder="지출 금액"
        />
      </div>
      <div className="grid items-center gap-1.5  flex-1 w-full">
        <Label htmlFor="description">내용</Label>
        <Input
          type="text"
          id="description"
          name="description"
          placeholder="지출 내용"
        />
      </div>
      <Button type="submit" className="w-fit">
        저장
      </Button>
    </form>
  );
};

export default CreateExpense;
