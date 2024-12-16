import { useMutation } from "@tanstack/react-query";
import useErrorStore from "../store/error";
import useRequiredCoinStore from "../store/requiredCoin";
import Item from "../models/item";
import { queryClient } from "../api/queryClient";
import { buyReward, completeTask } from "../api/itemApi";
import { fetchUserData } from "../api/userApi";

const useItemCardActions = (item: Item) => {
  const addError = useErrorStore((state) => state.addError);
  const setRequiredCoin = useRequiredCoinStore(
    (state) => state.setRequiredCoin,
  );

  const { mutate: completeTaskMutation } = useMutation({
    mutationFn: async () => completeTask(item),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["user-data"],
      });
      queryClient.invalidateQueries({
        queryKey: ["items", "tasks"],
      });
      queryClient.invalidateQueries({
        queryKey: ["items", "log"],
      });
    },
    onError: (error) => {
      addError(error.message);
    },
  });

  const { mutate: buyRewardMutation } = useMutation({
    mutationFn: buyReward,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["user-data"],
      });
    },
    onError: (error) => {
      addError(error.message);
    },
  });

  const handleCompleteTask = () => {
    completeTaskMutation();
  };

  const handleBuyItem = async () => {
    const { coin: userCoin } = await fetchUserData();

    if (userCoin >= item.coin) {
      buyRewardMutation(item.coin);
    } else {
      const gap = item.coin - userCoin;
      setRequiredCoin(gap);
    }
  };

  return { handleBuyItem, handleCompleteTask };
};

export default useItemCardActions;
