import { useParams } from "react-router-dom";
import Category from "../models/category";

const usePath = () => {
  const params = useParams();
  const userId = params.userId;
  let category = params.category;

  if (category === undefined) {
    category = "tasks";
  }

  if (!["tasks", "rewards-shop", "log"].includes(category)) {
    // 에러 처리
    throw new Error("잘못된 주소입니다.");
  }

  return { userId, category } as { userId: string; category: Category };
};

export default usePath;
