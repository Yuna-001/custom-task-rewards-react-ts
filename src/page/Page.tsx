import AddCard from "./AddCard";
import ItemCard from "./ItemCard";
import PageLayout from "../layout/PageLayout";

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

const Page: React.FC<{ type: "tasks" | "rewards-shop" | "storage" }> = ({
  type,
}) => {
  let items: Array<{ title: string; coin: number }> = DUMMY_TASKS;

  if (type === "rewards-shop") {
    items = DUMMY_REWARDS;
  } else if (type === "storage") {
    items = DUMMY_STORED_ITEMS;
  }

  return (
    <>
      {type !== "storage" && <AddCard />}
      {items.map(({ title, coin }) => (
        <ItemCard
          key={title + String(coin)}
          type={type}
          title={title}
          coin={coin}
        />
      ))}
    </>
  );
};

export default Page;
