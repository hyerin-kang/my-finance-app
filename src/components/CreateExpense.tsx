import { Label } from "@radix-ui/react-label";
import { Input } from "./ui/input";
import { Button } from "./ui/button";

const CreateExpense = () => {
  return (
    <form className="p-4 shadow-md rounded-md flex-col sm:flex-row flex flex-wrap gap-4 items-end">
      <div className="grid items-center gap-1.5  flex-1 w-full">
        <Label htmlFor="date">날짜</Label>
        <Input type="date" id="date" placeholder="날짜" />
      </div>
      <div className="grid items-center gap-1.5  flex-1 w-full">
        <Label htmlFor="item">항목</Label>
        <Input type="text" id="item" placeholder="지출항목" />
      </div>
      <div className="grid items-center gap-1.5  flex-1 w-full">
        <Label htmlFor="amount">금액</Label>
        <Input type="number" id="amount" placeholder="지출 금액" />
      </div>
      <div className="grid items-center gap-1.5  flex-1 w-full">
        <Label htmlFor="description">내용</Label>
        <Input type="text" id="description" placeholder="지출 내용" />
      </div>
      <Button type="submit" className="w-fit">
        저장
      </Button>
    </form>
  );
};

export default CreateExpense;
