import { useMutation } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import { v4 as uuidv4 } from "uuid";

import useErrorStore from "../store/error";
import { createNewItem, deleteItem, updateItem } from "../api/itemApi";
import { queryClient } from "../api/queryClient";
import ItemPageMode from "../models/itemPageMode";
import Item from "../models/item";
import Category from "../models/category";

const useItemPageActions = (
  category: Category,
  mode: ItemPageMode,
  itemId: string | undefined,
  userId: string,
) => {
  const navigate = useNavigate();

  const addError = useErrorStore((state) => state.addError);

  const { mutate } = useMutation({
    mutationFn: mode === "create" ? createNewItem : updateItem,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["items", category],
      });
      navigate(`/${userId}/${category}`);
    },
    onError: (error) => {
      addError(error.message);
    },
  });

  const { mutate: mutateDeleteItem } = useMutation({
    mutationFn: deleteItem,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["items", category],
        refetchType: "none",
      });
      navigate(`/${userId}/${category}`);
    },
    onError: (error) => {
      addError(error.message);
    },
  });

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const data = new FormData(event.currentTarget);

    const title = data.get("title")?.toString().trim() || "";
    const coinString = data.get("coin")?.toString().trim() || "";
    const coin = Number(coinString);
    const endDate = data.get("endDate")?.toString().trim() || "";
    const description = data.get("description")?.toString().trim() || "";

    const item: Item = {
      id: itemId ?? uuidv4(),
      title,
      coin,
      endDate,
      description,
    };

    mutate({ category, item });
  };

  const handleDelete: () => void = () => {
    if (itemId) {
      mutateDeleteItem({ category, itemId });
    }
  };

  return { handleSubmit, handleDelete };
};

export default useItemPageActions;
