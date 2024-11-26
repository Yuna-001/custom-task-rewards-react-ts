import { useQuery } from "@tanstack/react-query";

import AddCard from "../components/card/AddCard";
import ItemCard from "../components/card/ItemCard";
import PageLayout from "../components/layout/PageLayout";
import usePath from "../hooks/usePath";
import { fetchItemsByCategory } from "../api/itemApi";
import { useRef } from "react";
import CoinShortageModal from "../components/modal/CoinShortageModal";

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
    modal.current?.open();
    modal.current?.setRequiredCoin(requiredCoin);
  };

  return (
    <>
      <CoinShortageModal ref={modal} />
      <PageLayout>
        <AddCard />
        {items
          ?.slice()
          .reverse()
          .map((item) => (
            <ItemCard key={item.id} item={item} onModalOpen={handleModalOpen} />
          ))}
      </PageLayout>
    </>
  );
};

export default MainPage;
