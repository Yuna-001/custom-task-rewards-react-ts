import { useParams } from "react-router-dom";
import AddCard from "./AddCard";
import ItemCard from "./ItemCard";
import PageLayout from "../layout/PageLayout";
import CategoryType from "../models/categoryType";

const DUMMY_TASKS = [
  { title: "HTML", coin: 100 },
  { title: "CSS", coin: 1000 },
  { title: "자바스크립트", coin: 10000 },
  {
    title: "타입스크립트 프로젝트에 적용하기",
    coin: 30000,
  },
  { title: "리액트", coin: 134321 },
  { title: "스타일드 컴포넌트", coin: 655500 },
  { title: "테일윈드", coin: 500 },
  { title: "부트스트랩", coin: 66 },
  { title: "HTTP", coin: 103420 },
  { title: "네트워크", coin: 300000 },
];

const DUMMY_REWARDS = [
  { title: "하루 휴식", coin: 10000 },
  { title: "아이스크림 먹기", coin: 1000 },
  { title: "외식", coin: 2000 },
];

const DUMMY_STORED_ITEMS = [
  { title: "하루 휴식", coin: 10000 },
  { title: "아이스크림 먹기", coin: 1000 },
];

const Page: React.FC = () => {
  let { category } = useParams();

  let items: Array<{ title: string; coin: number }> = DUMMY_TASKS;

  if (category === undefined) {
    category = "tasks";
  }

  if (!["tasks", "rewards-shop", "storage"].includes(category)) {
    // 에러 처리
  }

  if (category === "rewards-shop") {
    items = DUMMY_REWARDS;
  } else if (category === "storage") {
    items = DUMMY_STORED_ITEMS;
  }

  return (
    <PageLayout>
      <AddCard category={category as CategoryType} />
      {items.map(({ title, coin }) => (
        <ItemCard
          key={title + String(coin)}
          category={category as CategoryType}
          title={title}
          coin={coin}
        />
      ))}
    </PageLayout>
  );
};

export default Page;
