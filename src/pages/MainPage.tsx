import { useQuery } from "@tanstack/react-query";

import { fetchItemsByCategory } from "../api/itemApi";
import AddCard from "../components/card/AddCard";
import ItemCard from "../components/card/ItemCard";
import PageLayout from "../components/layout/PageLayout";
import CoinShortageModal from "../components/modal/CoinShortageModal";
import usePath from "../hooks/usePath";
import useErrorStore from "../store/error";

const MainPage: React.FC = () => {
  const addError = useErrorStore((state) => state.addError);

  const { category } = usePath();
  const { data, isError, error } = useQuery({
    queryKey: ["items", category],
    queryFn: () => fetchItemsByCategory(category),
  });

  if (isError) {
    addError(error.message);
    return null;
  }

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
