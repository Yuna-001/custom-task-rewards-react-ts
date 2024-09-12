import { useParams } from "react-router-dom";

const useCategory = () => {
  let { category } = useParams();

  if (category === undefined) {
    category = "tasks";
  }

  if (!["tasks", "rewards-shop", "storage"].includes(category)) {
    // 에러 처리
  }

  return category;
};

export default useCategory;
