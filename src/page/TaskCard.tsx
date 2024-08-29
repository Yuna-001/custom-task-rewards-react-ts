import { Link } from "react-router-dom";
import styled from "styled-components";

import coinImg from "../assets/coin.svg";
import Card from "../components/UI/Card";
import ActionButton from "../components/UI/ActionButton";

const MyCoinData = styled.p`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  margin: 0;
`;

const Content = styled.article`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  margin-bottom: 1rem;
`;

const ButtonArea = styled.nav`
  width: 100%;
  display: grid;
  grid-template-columns: 1fr 1fr;
`;

const DetailLink = styled(Link)`
  font-size: 0.8rem;
  font-weight: 600;
  color: #74726e;
  &:hover {
    text-decoration: underline;
  }
`;

const TaskCard: React.FC<{
  title: string;
  coin: number;
}> = ({ title, coin }) => {
  const id: string = title + String(coin);
  let showingTitle: string = title;

  if (title.length > 30) showingTitle = title.slice(0, 30) + "...";

  return (
    <Card>
      <Content>
        <div>
          <MyCoinData>
            <img src={coinImg} alt="동전" width={32} />
            <span>{coin}</span>
          </MyCoinData>
        </div>
        <h3> {showingTitle}</h3>
        <DetailLink to={`${id}`}>자세히 보기</DetailLink>
      </Content>
      <ButtonArea>
        <ActionButton>
          <Link to={`${id}/edit`}>편집</Link>
        </ActionButton>
        <ActionButton>완료</ActionButton>
      </ButtonArea>
    </Card>
  );
};

export default TaskCard;
