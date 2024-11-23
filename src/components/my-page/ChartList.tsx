import { styled } from "styled-components";
import { useQuery } from "@tanstack/react-query";

import Chart from "./Chart";
import media from "../../media";
import { fetchMonthlyData } from "../../utils/http";

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
  const { data, isFetching } = useQuery({
    queryFn: fetchMonthlyData,
    queryKey: ["items", "log"],
    initialData,
  });

  if (isFetching) return null;

  return (
    <Charts>
      <Chart data={data.coinData} title={data.coinData?.[0].id || ""} />
      <Chart data={data.taskData} title={data.taskData?.[0].id || ""} />
    </Charts>
  );
};

export default ChartList;
