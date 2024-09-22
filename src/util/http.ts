import {
  arrayUnion,
  doc,
  getDoc,
  updateDoc,
  DocumentReference,
  DocumentData,
} from "firebase/firestore";
import { db } from "../firebase";
import { QueryClient } from "@tanstack/react-query";
import { v4 as uuidv4 } from "uuid";

import ItemType from "../models/itemType";
import useUserStore from "../store/user";
import CategoryType from "../models/categoryType";

export const queryClient = new QueryClient();

export const fetchItemsByCategory: (category: CategoryType) => Promise<{
  items: ItemType[];
  userDocRef: DocumentReference<DocumentData, DocumentData>;
}> = async (category) => {
  const userId = useUserStore.getState().id;
  const userDocRef = doc(db, "user-data", userId);

  try {
    const userDoc = await getDoc(userDocRef);
    const data = userDoc.data();
    const items: Array<ItemType> = data ? data[category] : [];

    return { items, userDocRef };
  } catch (error) {
    throw new Error("데이터를 불러오는 데 실패하였습니다.");
  }
};

export const fetchUserData: () => Promise<{
  nickname: string;
  coin: number;
  userDocRef: DocumentReference<DocumentData, DocumentData>;
}> = async () => {
  const userId = useUserStore.getState().id;
  const userDocRef = doc(db, "user-data", userId);

  try {
    const userDoc = await getDoc(userDocRef);
    const data = userDoc.data();

    const nickname: string = data?.nickname || "";
    const coin: number = data?.coin || 0;

    return { nickname, coin, userDocRef };
  } catch (error) {
    throw new Error("사용자의 데이터를 불러오는 데 실패하였습니다.");
  }
};

export const fetchItem: (
  category: CategoryType,
  itemId: string | undefined,
) => Promise<ItemType | null> = async (category, itemId) => {
  const { items } = await fetchItemsByCategory(category);
  const item = items?.find(({ id }) => id === itemId);

  return item ?? null;
};

export const createNewItem: ({
  category,
  item,
}: {
  category: CategoryType;
  item: ItemType;
}) => Promise<void> = async ({ category, item }) => {
  const userId = useUserStore.getState().id;
  const userDocRef = doc(db, "user-data", userId);

  try {
    await updateDoc(userDocRef, {
      [category]: arrayUnion(item),
    });
  } catch (error) {
    throw Error("데이터를 추가하는 데 실패하였습니다.");
  }
};

export const updateItem: ({
  category,
  item,
}: {
  category: CategoryType;
  item: ItemType;
}) => Promise<void> = async ({ category, item: updatedItem }) => {
  try {
    const { items, userDocRef } = await fetchItemsByCategory(category);

    const updatedItems = items.map((item: ItemType) =>
      item.id === updatedItem.id ? updatedItem : item,
    );

    await updateDoc(userDocRef, {
      [category]: updatedItems,
    });
  } catch (error) {
    throw new Error("데이터 업데이트에 실패하였습니다.");
  }
};

export const deleteItem: ({
  category,
  itemId,
}: {
  category: CategoryType;
  itemId: string;
}) => Promise<void> = async ({ category, itemId }) => {
  try {
    const { items, userDocRef } = await fetchItemsByCategory(category);

    const updatedItems = items.filter((item: ItemType) => item.id !== itemId);

    await updateDoc(userDocRef, {
      [category]: updatedItems,
    });
  } catch (error) {
    throw new Error("데이터 삭제에 실패하였습니다.");
  }
};

const updateUserCoin: (coin: number) => Promise<void> = async (coin) => {
  const { coin: userCoin, userDocRef } = await fetchUserData();
  const updatedCoin = userCoin + coin;

  try {
    await updateDoc(userDocRef, {
      coin: updatedCoin,
    });
  } catch (error) {
    throw new Error("데이터 업데이트에 실패했습니다.");
  }
};

export const completeTask: ({
  itemId,
  coin,
}: {
  itemId: string;
  coin: number;
}) => Promise<void> = async ({ itemId, coin }) => {
  // 사용자의 coin을 업데이트
  await updateUserCoin(coin);

  // item 삭제
  await deleteItem({ category: "tasks", itemId });
};

export const buyReward: ({
  item,
  coin,
}: {
  item: ItemType;
  coin: number;
}) => Promise<void> = async ({ item, coin }) => {
  // user의 coin을 업데이트
  await updateUserCoin(coin * -1);

  //storage에 item 추가
  item.id = uuidv4();
  await createNewItem({ category: "storage", item });
};
