import { useParams } from "react-router-dom";
import CategoryType from "../models/categoryType";

const useCategory = () => {
  let { category } = useParams();

  if (category === undefined) {
    category = "tasks";
  }

  if (!["tasks", "rewards-shop", "storage"].includes(category)) {
    // 에러 처리
    throw new Error("잘못된 주소입니다.");
  }

  return category as CategoryType;
};

export default useCategory;
