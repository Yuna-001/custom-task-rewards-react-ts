import {
  arrayUnion,
  doc,
  DocumentData,
  DocumentReference,
  getDoc,
  updateDoc,
} from "firebase/firestore";
import { db } from "../firebase";

import Category from "../models/category";
import ChartData from "../models/chartData";
import Item from "../models/item";
import { identifierToId, updateUserCoin } from "./userApi";

export const fetchItemsByCategory: (category: Category) => Promise<{
  items: Item[];
  userDocRef: DocumentReference<DocumentData, DocumentData>;
}> = async (category) => {
  try {
    const userId = await identifierToId();
    const userDocRef = doc(db, "users", userId);
    const userDoc = await getDoc(userDocRef);
    const data = userDoc.data();
    const items: Array<Item> = data ? data[category] : [];

    return { items, userDocRef };
  } catch (error) {
    throw new Error("데이터를 불러오는 데 실패하였습니다.");
  }
};

export const fetchItem: (
  category: Category,
  itemId: string | undefined,
) => Promise<Item | null> = async (category, itemId) => {
  try {
    const { items } = await fetchItemsByCategory(category);
    const item = items?.find(({ id }) => id === itemId);

    return item ?? null;
  } catch (error) {
    throw new Error("데이터를 불러오는 데 실패하였습니다.");
  }
};

export const createNewItem: ({
  category,
  item,
}: {
  category: Category;
  item: Item;
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
  category: Category;
  item: Item;
}) => Promise<void> = async ({ category, item: updatedItem }) => {
  try {
    const { items, userDocRef } = await fetchItemsByCategory(category);

    const updatedItems = items.map((item: Item) =>
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
  category: Category;
  itemId: string;
}) => Promise<void> = async ({ category, itemId }) => {
  try {
    const { items, userDocRef } = await fetchItemsByCategory(category);

    const updatedItems = items.filter((item: Item) => item.id !== itemId);

    await updateDoc(userDocRef, {
      [category]: updatedItems,
    });
  } catch (error) {
    throw new Error("데이터 삭제에 실패하였습니다.");
  }
};

export const completeTask: (item: Item) => Promise<void> = async (item) => {
  // 사용자의 coin을 업데이트
  await updateUserCoin(item.coin, false);

  // item 삭제
  await deleteItem({ category: "tasks", itemId: item.id });

  const now = new Date();
  const completedDate = `${now.getFullYear()}-${(now.getMonth() + 1).toString().padStart(2, "0")}-${now.getDate().toString().padStart(2, "0")}`;

  item.completedDate = completedDate;

  // log에 추가
  await createNewItem({ category: "log", item });
};

export const logToTask: (item: Item) => Promise<void> = async (item) => {
  await updateUserCoin(-item.coin, false);

  await deleteItem({ category: "log", itemId: item.id });

  delete item.completedDate;

  await createNewItem({ category: "tasks", item });
};

export const buyReward: (coin: number) => Promise<void> = async (coin) => {
  // user의 coin을 업데이트
  await updateUserCoin(-coin, true);
};

export const fetchMonthlyData: () => Promise<{
  coinData: ChartData;
  taskData: ChartData;
}> = async () => {
  const { items } = await fetchItemsByCategory("log");

  let months = 12;

  if (window.innerWidth < 550) {
    // 화면이 550px 미만이면 최근 6개월 데이터만 가져오기
    months = 6;
  }

  const current = new Date();

  const monthlyCoinData = new Map<string, number>();
  const monthlyTaskData = new Map<string, number>();

  const startDate = new Date();
  startDate.setMonth(current.getMonth() - months + 1);
  startDate.setDate(1);

  for (const { completedDate, coin } of items) {
    if (!completedDate) continue;

    const itemDate = new Date(completedDate);

    if (itemDate >= startDate) {
      const year = itemDate.getFullYear();
      const month = itemDate.getMonth() + 1;
      const key = `${year}-${month}`;
      monthlyCoinData.set(key, (monthlyCoinData.get(key) || 0) + coin);
      monthlyTaskData.set(key, (monthlyTaskData.get(key) || 0) + 1);
    }
  }

  const monthlyCoinArr = [];
  const monthlyTaskArr = [];

  let startYear = startDate.getFullYear();
  let startMonth = startDate.getMonth() + 1;

  for (let i = 0; i < months; i++, startMonth++) {
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
      id: `월별 획득 코인 (최근 ${months}개월)`,
      data: [...monthlyCoinArr],
    },
  ];
  const taskData = [
    {
      id: `월별 완료한 일 (최근 ${months}개월)`,
      data: [...monthlyTaskArr],
    },
  ];

  return { coinData, taskData };
};
