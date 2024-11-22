import styled from "styled-components";

import Chart from "../components/UI/Chart";
import media from "../media";

const Dashboard = styled.div`
  display: flex;
  flex-direction: row;

  ${media.medium`
    flex-direction:column;
    `}
`;

const data = [
  {
    id: "germany",
    color: "hsl(253, 70%, 50%)",
    data: [
      {
        x: "plane",
        y: 278,
      },
      {
        x: "helicopter",
        y: 130,
      },
      {
        x: "boat",
        y: 158,
      },
      {
        x: "train",
        y: 185,
      },
      {
        x: "subway",
        y: 61,
      },
      {
        x: "bus",
        y: 197,
      },
      {
        x: "car",
        y: 95,
      },
      {
        x: "moto",
        y: 98,
      },
      {
        x: "bicycle",
        y: 174,
      },
      {
        x: "horse",
        y: 80,
      },
      {
        x: "skateboard",
        y: 233,
      },
      {
        x: "others",
        y: 103,
      },
    ],
  },
];

const DashboardPage = () => {
  return (
    <>
      <div>
        <div>현재 코인</div>
        <div>누적 코인 </div>
      </div>
      <Dashboard>
        <Chart data={data} />
        <Chart data={data} />
      </Dashboard>
    </>
  );
};

export default DashboardPage;
