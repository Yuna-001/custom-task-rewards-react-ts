import { Link } from "react-router-dom";
import styled from "styled-components";
import { ReactNode } from "react";

import coinImg from "../assets/coin.svg";
import Card from "../components/UI/Card";
import ActionButton from "../components/UI/ActionButton";
import CoinData from "../components/UI/CoinData";
import ItemType from "../models/itemType";
import usePath from "../hooks/usePath";
import { dateFormatting } from "../util/formatting";
import { useMutation } from "@tanstack/react-query";
import { buyReward, completeTask, deleteItem, queryClient } from "../util/http";

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

const Header = styled.header`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-right: 0.5rem;
`;

const ItemCard: React.FC<{
  item: ItemType;
}> = ({ item }) => {
  const { category, userId } = usePath();
  const { title, coin, id: itemId } = item;

  const { mutate } = useMutation({
    mutationFn: async () => {
      if (category === "tasks") return completeTask({ itemId, coin });
      if (category === "rewards-shop") return buyReward({ item, coin });
      if (category === "storage") return deleteItem({ category, itemId });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["user-data"],
      });
      queryClient.invalidateQueries({
        queryKey: ["items", category],
      });
    },
  });

  const handleActionButtonClick = () => {
    mutate();
  };

  let actionBtn1: ReactNode = (
    <Link to={`/${userId}/${category}/${itemId}/edit`}>
      <ActionButton>편집</ActionButton>
    </Link>
  );

  let actionBtn2: ReactNode = (
    <ActionButton onClick={handleActionButtonClick}>완료</ActionButton>
  );

  let showingTitle: string = title;

  if (title.length > 30) showingTitle = title.slice(0, 30) + "...";

  if (category === "rewards-shop") {
    actionBtn2 = (
      <ActionButton onClick={handleActionButtonClick}>구입</ActionButton>
    );
  } else if (category === "storage") {
    actionBtn1 = <ActionButton>환불</ActionButton>;
    actionBtn2 = (
      <ActionButton onClick={handleActionButtonClick}>사용</ActionButton>
    );
  }

  return (
    <Card>
      <Content>
        <Header>
          <CoinData image={coinImg} coin={coin} />
          {item?.endDate && <span>~ {dateFormatting(item.endDate)}</span>}
        </Header>
        <h3> {showingTitle}</h3>
        <DetailLink to={`/${userId}/${category}/${itemId}`}>
          자세히 보기
        </DetailLink>
      </Content>
      <ActionButtons>
        {actionBtn1}
        {actionBtn2}
      </ActionButtons>
    </Card>
  );
};

export default ItemCard;
