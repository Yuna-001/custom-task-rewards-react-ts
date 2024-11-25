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
import { useMutation } from "@tanstack/react-query";
import {
  buyReward,
  completeTask,
  fetchUserData,
  queryClient,
} from "../../utils/http";
import useErrorStore from "../../store/error";

const Content = styled(Link)`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
`;

const TextButtons = styled.div`
  width: 100%;
  display: grid;
  grid-template-columns: 1fr 1fr;
  margin-bottom: -0.5rem;
`;

const CompletedDate = styled.div`
  width: 100%;
  margin-bottom: -0.5rem;
  color: #74726e;
  padding: 1rem 1.5rem;
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
  onModalOpen: (gap: number) => void;
}> = ({ item, onModalOpen }) => {
  const { category, userId } = usePath();
  const { title, coin, id: itemId } = item;

  const { addError } = useErrorStore();

  const { mutate } = useMutation({
    mutationFn: async () => {
      if (category === "tasks") return completeTask({ item, coin });
      if (category === "rewards-shop") return buyReward(coin);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["user-data"],
      });
      if (category === "tasks" || category === "log") {
        queryClient.invalidateQueries({
          queryKey: ["items", "tasks"],
        });
        queryClient.invalidateQueries({
          queryKey: ["items", "log"],
        });
      } else {
        queryClient.invalidateQueries({
          queryKey: ["items", category],
        });
      }
    },
    onError: (error) => {
      addError(error.message);
    },
  });

  const handleTextButtonClick = () => {
    mutate();
  };

  const handleBuyItem = async () => {
    const { coin: userCoin } = await fetchUserData();

    if (userCoin >= coin) {
      mutate();
    } else {
      const gap = coin - userCoin;
      onModalOpen(gap);
    }
  };

  const actionBtn1: ReactNode = (
    <Link to={`/${userId}/${category}/${itemId}/edit`}>
      <TextButton>편집</TextButton>
    </Link>
  );

  let actionBtn2: ReactNode = (
    <TextButton onClick={handleTextButtonClick}>완료</TextButton>
  );

  let showingTitle: string = title;

  if (title.length > 35) showingTitle = title.slice(0, 35) + "...";

  if (category === "rewards-shop") {
    actionBtn2 = <TextButton onClick={handleBuyItem}>구입</TextButton>;
  }

  const footerElement =
    category === "log" ? (
      <CompletedDate>
        {item.completedDate ? dateFormatting(item.completedDate) : ""}
      </CompletedDate>
    ) : (
      <TextButtons>
        {actionBtn1}
        {actionBtn2}
      </TextButtons>
    );

  return (
    <Card>
      <Content to={`/${userId}/${category}/${itemId}`}>
        <Header>
          <CoinData image={coinImg} coin={coin} />
          {item?.endDate && <span>~ {dateFormatting(item.endDate)}</span>}
        </Header>
        <Title> {showingTitle}</Title>
      </Content>
      {footerElement}
    </Card>
  );
};

export default ItemCard;
