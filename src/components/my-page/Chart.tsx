import { ResponsiveLine } from "@nivo/line";
import styled from "styled-components";

import media from "../../media";
import ChartDataType from "../../models/chartDataType";

const Container = styled.div`
  height: 25rem;
  width: 50%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  ${media.medium`
    width : 100%;
    `};
`;

const ChartWrapper = styled.div`
  height: 22rem;
  width: 100%;
  margin-top: -3rem;
  margin-right: -5rem;
  ${media.medium`
    width : 100%;
    height: 25rem;
    `};
`;

const Title = styled.h3`
  font-size: 1rem;
`;

interface ChartProps {
  data: ChartDataType;
  title: string;
}

const Chart: React.FC<ChartProps> = ({ data, title }) => {
  if (
    data.length === 0 ||
    data[0].data.length === 0 ||
    data[0].data.some(
      ({ x, y }) =>
        x === null || y === null || x === undefined || y === undefined,
    )
  ) {
    return null;
  }

  return (
    <Container>
      <Title>{title}</Title>
      <ChartWrapper>
        <ResponsiveLine
          data={data}
          margin={{ top: 50, right: 110, bottom: 50, left: 60 }}
          xScale={{
            type: "time",
            format: "%Y-%m",
          }}
          xFormat="time:%Y-%m"
          yScale={{
            type: "linear",
            min: "auto",
            max: "auto",
            stacked: false,
            reverse: false,
          }}
          yFormat=" >-.2d"
          axisTop={null}
          axisRight={null}
          axisBottom={{
            format: "%b",
          }}
          axisLeft={{
            tickSize: 5,
            tickPadding: 5,
            tickRotation: 0,
            truncateTickAt: 0,
          }}
          pointSize={6}
          pointColor={{ from: "color", modifiers: [] }}
          pointBorderWidth={2}
          pointBorderColor={{ from: "serieColor" }}
          pointLabel="data.yFormatted"
          pointLabelYOffset={-12}
          enableTouchCrosshair={true}
          useMesh={true}
        />
      </ChartWrapper>
    </Container>
  );
};

export default Chart;
