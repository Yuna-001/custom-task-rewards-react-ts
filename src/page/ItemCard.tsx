import { Link } from "react-router-dom";
import styled from "styled-components";
import { ReactNode } from "react";

import coinImg from "../assets/coin.svg";
import Card from "../components/UI/Card";
import ActionButton from "../components/UI/ActionButton";

const CoinData = styled.p`
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

const ItemCard: React.FC<{
  type: "tasks" | "rewards-shop" | "storage";
  title: string;
  coin: number;
}> = ({ type, title, coin }) => {
  const id: string = title + String(coin);
  let showingTitle: string = title;

  let actionBtn1: ReactNode = (
    <ActionButton>
      <Link to={`/home/${type}/${id}/edit`}>편집</Link>
    </ActionButton>
  );
  let actionBtn2: ReactNode = <ActionButton>완료</ActionButton>;

  if (title.length > 30) showingTitle = title.slice(0, 30) + "...";

  if (type === "rewards-shop") {
    actionBtn2 = <ActionButton>구입</ActionButton>;
  } else if (type === "storage") {
    actionBtn1 = <ActionButton>환불</ActionButton>;
    actionBtn2 = <ActionButton>완료</ActionButton>;
  }

  return (
    <Card>
      <Content>
        <div>
          <CoinData>
            <img src={coinImg} alt="동전" width={32} />
            <span>{coin}</span>
          </CoinData>
        </div>
        <h3> {showingTitle}</h3>
        <DetailLink to={`/home/${type}/${id}`}>자세히 보기</DetailLink>
      </Content>
      <ButtonArea>
        {actionBtn1}
        {actionBtn2}
      </ButtonArea>
    </Card>
  );
};

export default ItemCard;
