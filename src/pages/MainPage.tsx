import { useQuery } from "@tanstack/react-query";

import { useEffect } from "react";
import { fetchItemsByCategory } from "../api/itemApi";
import AddCard from "../components/card/AddCard";
import ItemCard from "../components/card/ItemCard";
import PageLayout from "../components/layout/PageLayout";
import CoinShortageModal from "../components/modal/CoinShortageModal";
import usePath from "../hooks/usePath";
import useErrorStore from "../store/error";
import LoadingPage from "./LoadingPage";

const MainPage: React.FC = () => {
  const addError = useErrorStore((state) => state.addError);

  const { category } = usePath();
  const { data, isError, error, isPending } = useQuery({
    queryKey: ["items", category],
    queryFn: () => fetchItemsByCategory(category),
  });

  useEffect(() => {
    if (isError && error) {
      addError(error.message);
    }
  }, [isError, error]);

  if (isError) return null;
  if (isPending) return <LoadingPage />;

  const items = data?.items;

  return (
    <>
      {category === "rewards-shop" && <CoinShortageModal />}
      <PageLayout>
        <AddCard />
        {items
          ?.slice()
          .reverse()
          .map((item) => <ItemCard key={item.id} item={item} />)}
      </PageLayout>
    </>
  );
};

export default MainPage;
