import AddCard from "../components/UI/AddCard";
import TaskCard from "./TaskCard";

const DUMMY_ITEMS = [
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

const TaskPage: React.FC = () => {
  return (
    <>
      <AddCard />
      {DUMMY_ITEMS.map(({ title, coin }) => (
        <TaskCard key={title + String(coin)} title={title} coin={coin} />
      ))}
    </>
  );
};

export default TaskPage;
