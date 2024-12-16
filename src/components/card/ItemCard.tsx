import { Link } from "react-router-dom";
import styled from "styled-components";
import { ReactNode } from "react";

import coinImg from "../../assets/coin.svg";
import Card from "./Card";
import TextButton from "../UI/TextButton";
import CoinData from "../UI/CoinData";
import ItemType from "../../models/itemType";
import usePath from "../../hooks/usePath";
import { dateFormatting } from "../../utils/formatting";
import CardFooter from "./CardFooter";
import useItemCardActions from "../../hooks/useItemCardActions";

const Content = styled(Link)`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
`;

const Header = styled.header`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-right: 0.5rem;
`;

const Title = styled.h3`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100%;
  padding: 0 4px;
`;

const ItemCard: React.FC<{
  item: ItemType;
}> = ({ item }) => {
  const { category, userId } = usePath();
  const { title, coin, id: itemId } = item;
  const { handleBuyItem, handleCompleteTask } = useItemCardActions(item);

  const actionBtn1: ReactNode = (
    <Link to={`/${userId}/${category}/${itemId}/edit`}>
      <TextButton>편집</TextButton>
    </Link>
  );

  const actionBtn2: ReactNode =
    category === "rewards-shop" ? (
      <TextButton onClick={handleBuyItem}>구입</TextButton>
    ) : (
      <TextButton onClick={handleCompleteTask}>완료</TextButton>
    );

  const showingTitle = title.length > 35 ? `${title.slice(0, 35)}...` : title;

  return (
    <Card>
      <Content to={`/${userId}/${category}/${itemId}`}>
        <Header>
          <CoinData image={coinImg} coin={coin} />
          {item?.endDate && <span>~ {dateFormatting(item.endDate)}</span>}
        </Header>
        <Title> {showingTitle}</Title>
      </Content>
      <CardFooter
        category={category}
        actionBtn1={actionBtn1}
        actionBtn2={actionBtn2}
        completedDate={item.completedDate}
      />
    </Card>
  );
};

export default ItemCard;
