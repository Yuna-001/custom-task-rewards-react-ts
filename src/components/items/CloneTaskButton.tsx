import { useMutation } from "@tanstack/react-query";
import { v4 as uuidv4 } from "uuid";

import { createNewItem, queryClient } from "../../utils/http";
import TextButton from "../UI/TextButton";
import ItemType from "../../models/itemType";
import useErrorStore from "../../store/error";

const CloneTaskButton: React.FC<{ item: ItemType | undefined | null }> = ({
  item,
}) => {
  const { addError } = useErrorStore();

  const { mutate } = useMutation({
    mutationFn: createNewItem,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["items", "tasks"],
      });
    },
    onError: (error) => {
      addError(error.message);
    },
  });

  const handleCloneTask = () => {
    if (item) {
      const newItem = { ...item, id: uuidv4() };
      mutate({ category: "tasks", item: newItem });
    }
  };

  return <TextButton onClick={handleCloneTask}>동일한 할 일 생성</TextButton>;
};

export default CloneTaskButton;
