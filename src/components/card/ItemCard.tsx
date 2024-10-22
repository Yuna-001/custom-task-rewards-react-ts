import { Link } from "react-router-dom";
import styled from "styled-components";
import { ReactNode } from "react";

import coinImg from "../../assets/coin.svg";
import Card from "./Card";
import ActionButton from "../UI/ActionButton";
import CoinData from "../UI/CoinData";
import ItemType from "../../models/itemType";
import usePath from "../../hooks/usePath";
import { dateFormatting } from "../../utils/formatting";
import { useMutation } from "@tanstack/react-query";
import {
  buyReward,
  completeTask,
  deleteItem,
  queryClient,
  refundItem,
} from "../../utils/http";

const Content = styled(Link)`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
`;

const ActionButtons = styled.div`
  width: 100%;
  display: grid;
  grid-template-columns: 1fr 1fr;
  margin-bottom: -0.5rem;
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

  const { mutate: mutateRefundItem } = useMutation({
    mutationFn: refundItem,
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

  const handleRefundButtonClick = () => {
    mutateRefundItem({ itemId, coin });
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

  if (title.length > 35) showingTitle = title.slice(0, 35) + "...";

  if (category === "rewards-shop") {
    actionBtn2 = (
      <ActionButton onClick={handleActionButtonClick}>구입</ActionButton>
    );
  } else if (category === "storage") {
    actionBtn1 = (
      <ActionButton onClick={handleRefundButtonClick}>환불</ActionButton>
    );
    actionBtn2 = (
      <ActionButton onClick={handleActionButtonClick}>사용</ActionButton>
    );
  }

  return (
    <Card>
      <Content to={`/${userId}/${category}/${itemId}`}>
        <Header>
          <CoinData image={coinImg} coin={coin} />
          {item?.endDate && <span>~ {dateFormatting(item.endDate)}</span>}
        </Header>
        <Title> {showingTitle}</Title>
      </Content>
      <ActionButtons>
        {actionBtn1}
        {actionBtn2}
      </ActionButtons>
    </Card>
  );
};

export default ItemCard;
