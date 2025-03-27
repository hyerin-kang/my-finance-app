import { Link } from "react-router";
import { useListQuery } from "../hooks/useExpensesQuery";

const ExpenseList = () => {
  const amountToWon = (amount: number) => {
    return new Intl.NumberFormat("ko-KR").format(amount);
  };

  const { data, isPending, isError } = useListQuery();

  if (isPending) {
    return <div>로딩중...</div>;
  }

  if (isError) {
    return <div>데이터 조회 중 오류가 발생했습니다.</div>;
  }

  return (
    <div className="shadow-md p-4 rounded-md space-y-4">
      {data.length > 0 ? (
        data.map(function (item) {
          return (
            <Link
              to={`/detail/${item.id}`}
              key={item.id}
              className="flex items-center justify-between p-4 rounded-md bg-gray-50 border-1"
            >
              <div>
                <div className="text-sm text-gray-500">{item.date}</div>
                <div className="text-lg font-bold text-blue-500">
                  {item.item} - {item.description}
                </div>
              </div>
              <div className="text-lg font-bold text-blue-500">
                {amountToWon(item.amount)}원
              </div>
            </Link>
          );
        })
      ) : (
        <div className="text-center text-gray-500"> 데이터가 없습니다</div>
      )}
    </div>
  );
};

export default ExpenseList;
