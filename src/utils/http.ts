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
import ChartDataType from "../models/chartDataType";

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
  const completedDate =
    now.getFullYear() + "-" + (now.getMonth() + 1) + "-" + now.getDate();

  item.completedDate = completedDate;

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

export const fetchMonthlyData: () => Promise<{
  coinData: ChartDataType;
  taskData: ChartDataType;
}> = async () => {
  const { items } = await fetchItemsByCategory("log");

  const current = new Date();
  const curYear = current.getFullYear();
  const curMonth = current.getMonth() + 1;

  const monthlyCoinData = new Map<string, number>();
  const monthlyTaskData = new Map<string, number>();

  for (const { completedDate, coin } of items) {
    if (!completedDate) continue;

    const date = new Date(completedDate);
    const year = date.getFullYear();
    const month = date.getMonth() + 1;

    if (year === curYear || (year === curYear - 1 && month > curMonth)) {
      const key = `${year}-${month}`;
      monthlyCoinData.set(key, (monthlyCoinData.get(key) || 0) + coin);
      monthlyTaskData.set(key, (monthlyTaskData.get(key) || 0) + 1);
    }
  }

  const monthlyCoinArr = [];
  const monthlyTaskArr = [];

  let startYear = curYear - 1;
  let startMonth = curMonth + 1;

  if (curMonth === 12) {
    startYear = curYear;
    startMonth = 1;
  }

  for (let i = 0; i < 12; i++, startMonth++) {
    if (startMonth === 13) {
      startMonth = 1;
      startYear++;
    }

    const key = `${startYear}-${startMonth}`;

    monthlyCoinArr.push({ x: key, y: monthlyCoinData.get(key) || 0 });
    monthlyTaskArr.push({ x: key, y: monthlyTaskData.get(key) || 0 });
  }

  const coinData = [
    {
      id: "월별 획득 코인 (최근 1년)",
      data: [...monthlyCoinArr],
    },
  ];
  const taskData = [
    {
      id: "월별 완료한 일 (최근 1년)",
      data: [...monthlyTaskArr],
    },
  ];

  return { coinData, taskData };
};
