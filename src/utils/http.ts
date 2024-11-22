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

import ItemType from "../models/itemType";
import CategoryType from "../models/categoryType";

export const queryClient = new QueryClient();

export const fetchItemsByCategory: (category: CategoryType) => Promise<{
  items: ItemType[];
  userDocRef: DocumentReference<DocumentData, DocumentData>;
}> = async (category) => {
  try {
    const userId = await identifierToId();
    const userDocRef = doc(db, "users", userId);
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
  totalCoin: number;
  userDocRef: DocumentReference<DocumentData, DocumentData>;
}> = async () => {
  try {
    const userId = await identifierToId();
    const userDocRef = doc(db, "users", userId);
    const userDoc = await getDoc(userDocRef);
    const data = userDoc.data();

    const nickname: string = data?.nickname || "";
    const coin: number = data?.coin || 0;
    const totalCoin: number = data?.totalCoin || 0;

    return { nickname, coin, totalCoin, userDocRef };
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
  try {
    const userId = await identifierToId();
    const userDocRef = doc(db, "users", userId);

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

const updateUserCoin: (
  coin: number,
  isShopping: boolean,
) => Promise<void> = async (coin, isShopping) => {
  try {
    const { coin: userCoin, totalCoin, userDocRef } = await fetchUserData();

    const updatedData: { coin: number; totalCoin?: number } = {
      coin: userCoin + coin,
    };

    if (!isShopping) {
      updatedData.totalCoin = totalCoin + coin;
    }

    await updateDoc(userDocRef, updatedData);
  } catch (error) {
    throw new Error("데이터 업데이트에 실패하였습니다.");
  }
};

export const completeTask: ({
  item,
  coin,
}: {
  item: ItemType;
  coin: number;
}) => Promise<void> = async ({ item, coin }) => {
  // 사용자의 coin을 업데이트
  await updateUserCoin(coin, false);

  // item 삭제
  await deleteItem({ category: "tasks", itemId: item.id });

  const now = new Date();
  const compledDate =
    now.getFullYear() + "-" + (now.getMonth() + 1) + "-" + now.getDate();

  item.completedDate = compledDate;

  // log에 추가
  await createNewItem({ category: "log", item });
};

export const logToTask: ({
  item,
  coin,
}: {
  item: ItemType;
  coin: number;
}) => Promise<void> = async ({ item, coin }) => {
  await updateUserCoin(-coin, false);

  await deleteItem({ category: "log", itemId: item.id });

  delete item.completedDate;

  await createNewItem({ category: "tasks", item });
};

export const buyReward: (coin: number) => Promise<void> = async (coin) => {
  // user의 coin을 업데이트
  await updateUserCoin(-coin, true);
};

export const isDuplicatedId = async (id: string) => {
  const userDocRef = doc(db, "users", id);
  const userDoc = await getDoc(userDocRef);

  return userDoc.exists();
};

export const identifierToId = async () => {
  const identifier = sessionStorage.getItem("user") || "";

  const identifierDocRef = doc(db, "identifiers", identifier);

  try {
    const identifierDoc = await getDoc(identifierDocRef);
    const id = identifierDoc.data()?.id;

    if (id === undefined) {
      throw new Error();
    }

    return id;
  } catch (error) {
    throw new Error("사용자의 데이터를 불러오는 데 실패하였습니다.");
  }
};
