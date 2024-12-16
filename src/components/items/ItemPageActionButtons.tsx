import { Link } from "react-router-dom";
import Category from "../../models/category";
import ActionButton from "../UI/ActionButton";
import TextButton from "../UI/TextButton";
import LogToTaskButton from "./LogToTaskButton";
import Item from "../../models/item";
import CloneTaskButton from "./CloneTaskButton";
import ItemPageMode from "../../models/itemPageMode";

interface ItemPageActionButtonsProps {
  item: Item | undefined | null;
  category: Category;
  mode: ItemPageMode;
}

const ItemPageActionButtons: React.FC<ItemPageActionButtonsProps> = ({
  item,
  category,
  mode,
}) => {
  let actionBtn = <></>;

  if (category === "log") {
    actionBtn = <LogToTaskButton item={item} />;
  } else if (mode === "edit") {
    actionBtn = <ActionButton type="submit">저장</ActionButton>;
  } else if (mode === "create") {
    actionBtn = <ActionButton type="submit">추가</ActionButton>;
  } else {
    actionBtn = (
      <TextButton>
        <Link to="edit">편집</Link>
      </TextButton>
    );
  }

  return (
    <>
      {category !== "rewards-shop" && mode !== "create" && (
        <CloneTaskButton item={item} />
      )}
      {actionBtn}
    </>
  );
};

export default ItemPageActionButtons;
