import AddCard from "./AddCard";
import ItemCard from "./ItemCard";
import PageLayout from "../layout/PageLayout";
import useItemStore from "../store/items";
import usePath from "../hooks/usePath";

const Page: React.FC = () => {
  const { category } = usePath();
  const items = useItemStore((state) => state.getItemsByType(category));

  return (
    <PageLayout>
      <AddCard />
      {items.map((item) => (
        <ItemCard key={item.id} item={item} />
      ))}
    </PageLayout>
  );
};

export default Page;
