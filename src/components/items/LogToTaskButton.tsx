import { useMutation } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";

import Item from "../../models/item";
import TextButton from "../UI/TextButton";
import { queryClient } from "../../api/queryClient";
import { logToTask } from "../../api/itemApi";
import usePath from "../../hooks/usePath";
import useErrorStore from "../../store/error";

const LogToTaskButton: React.FC<{ item: Item | undefined | null }> = ({
  item,
}) => {
  const navigate = useNavigate();
  const { userId } = usePath();

  const addError = useErrorStore((state) => state.addError);

  const { mutate } = useMutation({
    mutationFn: logToTask,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["items", "log"],
      });
      queryClient.invalidateQueries({
        queryKey: ["items", "tasks"],
      });
      queryClient.invalidateQueries({
        queryKey: ["user-data"],
      });

      navigate(`/${userId}/tasks`);
    },
    onError: (error) => {
      addError(error.message);
    },
  });

  const handleCancelComplete = () => {
    if (item) {
      mutate({ item, coin: item.coin });
    }
  };

  return <TextButton onClick={handleCancelComplete}>완료 취소</TextButton>;
};

export default LogToTaskButton;
