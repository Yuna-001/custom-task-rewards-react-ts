import { arrayUnion, doc, getDoc, updateDoc } from "firebase/firestore";
import { db } from "../firebase";
import { QueryClient } from "@tanstack/react-query";

import ItemType from "../models/itemType";
import useUserStore from "../store/user";
import CategoryType from "../models/categoryType";

export const queryClient = new QueryClient();

export const fetchItemsByCategory: (
  category: CategoryType,
) => Promise<ItemType[]> = async (category) => {
  const userId = useUserStore.getState().id;
  const userDocRef = doc(db, "user-data", userId);

  try {
    const userDoc = await getDoc(userDocRef);
    const data = userDoc.data();
    const items: Array<ItemType> = data?.items || [];
    const filteredItems = items?.filter((item) => item.type === category);

    return filteredItems;
  } catch (error) {
    throw new Error("데이터를 불러오는 데 실패하였습니다.");
  }
};

export const fetchUserData: () => Promise<{
  nickname: string;
  coin: number;
}> = async () => {
  const userId = useUserStore.getState().id;
  const userDocRef = doc(db, "user-data", userId);

  try {
    const userDoc = await getDoc(userDocRef);
    const data = userDoc.data();

    const nickname: string = data?.nickname || "";
    const coin: number = data?.coin || 0;

    return { nickname, coin };
  } catch (error) {
    throw new Error("사용자의 데이터를 불러오는 데 실패하였습니다.");
  }
};

export const fetchItem: (
  itemId: string | undefined,
) => Promise<ItemType | undefined> = async (itemId) => {
  if (itemId === undefined) return undefined;

  const userId = useUserStore.getState().id;
  const userDocRef = doc(db, "user-data", userId);

  try {
    const userDoc = await getDoc(userDocRef);
    const data = userDoc.data();
    const items: Array<ItemType> = data?.items || [];

    return items?.find(({ id }) => id === itemId) || undefined;
  } catch (error) {
    throw new Error("데이터를 불러오는 데 실패하였습니다.");
  }
};

export const createNewItem: (item: ItemType) => Promise<void> = async (
  item,
) => {
  const userId = useUserStore.getState().id;
  const userDocRef = doc(db, "user-data", userId);

  try {
    await updateDoc(userDocRef, {
      items: arrayUnion(item),
    });
  } catch (error) {
    throw Error("데이터를 추가하는 데 실패하였습니다.");
  }
};

export const updateItem: (updatedItem: ItemType) => Promise<void> = async (
  updatedItem,
) => {
  const userId = useUserStore.getState().id;
  const userDocRef = doc(db, "user-data", userId);

  try {
    const userDoc = await getDoc(userDocRef);
    const data = userDoc.data();
    const items = data?.items || [];
    const updatedItems = items.map((item: ItemType) =>
      item.id === updatedItem.id ? updatedItem : item,
    );

    await updateDoc(userDocRef, {
      items: updatedItems,
    });
  } catch (error) {
    throw new Error("데이터 업데이트에 실패하였습니다.");
  }
};
