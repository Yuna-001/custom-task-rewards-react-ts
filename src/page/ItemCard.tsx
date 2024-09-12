import { Link } from "react-router-dom";
import styled from "styled-components";
import { ReactNode } from "react";

import coinImg from "../assets/coin.svg";
import Card from "../components/UI/Card";
import ActionButton from "../components/UI/ActionButton";
import CategoryType from "../models/categoryType";
import ItemType from "../models/itemType";
import CoinData from "../components/UI/CoinData";

const Content = styled.article`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  margin-bottom: 1rem;
`;

const ActionButtons = styled.div`
  width: 100%;
  display: grid;
  grid-template-columns: 1fr 1fr;
  margin-bottom: -0.5rem;
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
  category: CategoryType;
  task: ItemType;
}> = ({ category, task }) => {
  const { title, coin } = task;
  const id: string = title + String(coin);
  let showingTitle: string = title;

  let actionBtn1: ReactNode = (
    <ActionButton>
      <Link to={`/home/${category}/${id}/edit`}>편집</Link>
    </ActionButton>
  );
  let actionBtn2: ReactNode = <ActionButton>완료</ActionButton>;

  if (title.length > 30) showingTitle = title.slice(0, 30) + "...";

  if (category === "rewards-shop") {
    actionBtn2 = <ActionButton>구입</ActionButton>;
  } else if (category === "storage") {
    actionBtn1 = <ActionButton>환불</ActionButton>;
    actionBtn2 = <ActionButton>완료</ActionButton>;
  }

  return (
    <Card>
      <Content>
        <div>
          <CoinData image={coinImg} coin={coin} />
        </div>
        <h3> {showingTitle}</h3>
        <DetailLink to={`/home/${category}/${id}`}>자세히 보기</DetailLink>
      </Content>
      <ActionButtons>
        {actionBtn1}
        {actionBtn2}
      </ActionButtons>
    </Card>
  );
};

export default ItemCard;
