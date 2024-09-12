import AddCard from "./AddCard";
import ItemCard from "./ItemCard";
import PageLayout from "../layout/PageLayout";
import useItemStore from "../store/items";
import useCategory from "../hooks/useCategory";

const Page: React.FC = () => {
  const category = useCategory();
  const items = useItemStore((state) => state.getItemsByType(category));

  return (
    <PageLayout>
      <AddCard />
      {items.map((task) => (
        <ItemCard key={task.id} task={task} />
      ))}
    </PageLayout>
  );
};

export default Page;
