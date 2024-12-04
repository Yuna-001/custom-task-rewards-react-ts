import { useQuery } from "@tanstack/react-query";

import AddCard from "../components/card/AddCard";
import ItemCard from "../components/card/ItemCard";
import PageLayout from "../components/layout/PageLayout";
import usePath from "../hooks/usePath";
import { fetchItemsByCategory } from "../api/itemApi";
import CoinShortageModal from "../components/modal/CoinShortageModal";

const MainPage: React.FC = () => {
  const { category } = usePath();
  const { data } = useQuery({
    queryKey: ["items", category],
    queryFn: () => fetchItemsByCategory(category),
  });

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
