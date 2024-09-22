import { useQuery } from "@tanstack/react-query";

import AddCard from "./AddCard";
import ItemCard from "./ItemCard";
import PageLayout from "../layout/PageLayout";
import usePath from "../hooks/usePath";
import { fetchItemsByCategory } from "../util/http";

const MainPage: React.FC = () => {
  const { category } = usePath();
  const { data } = useQuery({
    queryKey: ["items", category],
    queryFn: () => fetchItemsByCategory(category),
  });
  const items = data?.items;

  return (
    <PageLayout>
      <AddCard />
      {items?.map((item) => <ItemCard key={item.id} item={item} />)}
    </PageLayout>
  );
};

export default MainPage;
