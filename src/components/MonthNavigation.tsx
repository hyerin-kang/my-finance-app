import { useSearchParams } from "react-router-dom";
import { Button } from "./ui/button";

const MonthNavigation = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const filterMonth = Number(searchParams.get("month"));

  const btns = Array.from({ length: 12 }, (_, i) => i + 1);

  const updateFilter = (item: number) => {
    setSearchParams({ month: item.toString() });
  };

  return (
    <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-2 p-4 shadow-md rounded-md">
      {btns.map(function (item) {
        return (
          <Button
            variant={`${filterMonth === item ? "default" : "outline"}`}
            key={item}
            onClick={() => updateFilter(item)}
          >
            {item}월
          </Button>
        );
      })}
    </div>
  );
};

export default MonthNavigation;
