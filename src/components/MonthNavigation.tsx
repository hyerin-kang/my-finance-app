import { Button } from "./ui/button";

const MonthNavigation = () => {
  const btns = Array.from({ length: 12 }, (_, i) => i + 1);

  return (
    <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-2 p-4 shadow-md rounded-md">
      {btns.map(function (item) {
        return (
          <Button variant="outline" key={item}>
            {item}월
          </Button>
        );
      })}
    </div>
  );
};

export default MonthNavigation;
