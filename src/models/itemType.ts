import CategoryType from "./categoryType";

type ItemType = {
  type: CategoryType;
  id: string;
  title: string;
  coin: number;
  endDate: string;
  description: string;
};

export default ItemType;
