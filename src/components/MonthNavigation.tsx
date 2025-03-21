import { Button } from "./ui/button";

const MonthNavigation = () => {
  return (
    <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-2 p-4 shadow-md rounded-md">
      <Button>1월</Button>
      <Button>2월</Button>
      <Button>3월</Button>
      <Button>4월</Button>
      <Button>5월</Button>
      <Button>6월</Button>
      <Button>7월</Button>
      <Button>8월</Button>
      <Button>9월</Button>
      <Button>10월</Button>
      <Button>11월</Button>
      <Button>12월</Button>
    </div>
  );
};

export default MonthNavigation;
