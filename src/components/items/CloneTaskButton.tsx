import { useMutation } from "@tanstack/react-query";
import { v4 as uuidv4 } from "uuid";

import { createNewItem, queryClient } from "../../utils/http";
import ActionButton from "../UI/ActionButton";
import ItemType from "../../models/itemType";

const CloneTaskButton: React.FC<{ item: ItemType | undefined | null }> = ({
  item,
}) => {
  const { mutate } = useMutation({
    mutationFn: createNewItem,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["items", "tasks"],
      });
    },
  });

  const handleCloneTask = () => {
    if (item) {
      const newItem = { ...item, id: uuidv4() };
      mutate({ category: "tasks", item: newItem });
    }
  };

  return (
    <ActionButton onClick={handleCloneTask}>동일한 할 일 생성</ActionButton>
  );
};

export default CloneTaskButton;
