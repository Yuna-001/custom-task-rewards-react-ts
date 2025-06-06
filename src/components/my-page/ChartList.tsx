import { useQuery } from "@tanstack/react-query";
import { styled } from "styled-components";

import { useEffect } from "react";
import { fetchMonthlyData } from "../../api/itemApi";
import media from "../../media";
import useErrorStore from "../../store/error";
import Chart from "./Chart";

const Charts = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;

  ${media.medium`
    flex-direction:column;
    gap:2rem;
    `}
`;

const initialData = {
  coinData: [
    {
      id: "월별 획득 코인",
      data: [],
    },
  ],
  taskData: [
    {
      id: "월별 완료한 일",
      data: [],
    },
  ],
};

const ChartList = () => {
  const addError = useErrorStore((state) => state.addError);

  const { data, isError, error, isPending } = useQuery({
    queryFn: fetchMonthlyData,
    queryKey: ["items", "log"],
    initialData,
  });

  useEffect(() => {
    if (isError && error) {
      addError(error.message);
    }
  }, [isError, error]);

  if (isError || isPending) return null;

  return (
    <Charts>
      {data?.coinData && (
        <Chart data={data.coinData} title={data.coinData?.[0]?.id || ""} />
      )}
      {data?.taskData && (
        <Chart data={data.taskData} title={data.taskData?.[0].id || ""} />
      )}
    </Charts>
  );
};

export default ChartList;
