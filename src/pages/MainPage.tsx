import { useQuery } from "@tanstack/react-query";

import AddCard from "../components/card/AddCard";
import ItemCard from "../components/card/ItemCard";
import PageLayout from "../components/layout/PageLayout";
import usePath from "../hooks/usePath";
import { fetchItemsByCategory } from "../utils/http";
import { useEffect, useRef, useState } from "react";
import CoinShortageModal from "../components/card/CoinShortageModal";

const MainPage: React.FC = () => {
  const { category } = usePath();
  const { data } = useQuery({
    queryKey: ["items", category],
    queryFn: () => fetchItemsByCategory(category),
  });
  const items = data?.items;

  const modal = useRef<{
    open: () => void;
    setRequiredCoin: (gap: number) => void;
  }>(null);

  const handleModalOpen = (requiredCoin: number) => {
    modal.current?.setRequiredCoin(requiredCoin);
    modal.current?.open();
  };

  return (
    <PageLayout>
      <CoinShortageModal ref={modal} />
      <AddCard />
      {items
        ?.slice()
        .reverse()
        .map((item) => (
          <ItemCard key={item.id} item={item} onModalOpen={handleModalOpen} />
        ))}
    </PageLayout>
  );
};

export default MainPage;
