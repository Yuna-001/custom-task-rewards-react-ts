import { useQuery } from "@tanstack/react-query";

import AddCard from "./AddCard";
import ItemCard from "./ItemCard";
import PageLayout from "../layout/PageLayout";
import usePath from "../hooks/usePath";
import { fetchItemsByCategory } from "../util/http";

const Page: React.FC = () => {
  const { category } = usePath();
  const { data, isError, error, isLoading, isFetching } = useQuery({
    queryKey: ["items", { category }],
    queryFn: () => fetchItemsByCategory(category),
  });
  const items = data?.items;

  if (isError) {
    return <div>{error.message}</div>;
  }

  if (isLoading) {
    return <div>로딩 중...</div>;
  }

  if (isFetching) {
    return <div>업데이트 중...</div>;
  }

  return (
    <PageLayout>
      <AddCard />
      {items?.map((item) => <ItemCard key={item.id} item={item} />)}
    </PageLayout>
  );
};

export default Page;
