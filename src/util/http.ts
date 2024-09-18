import { doc, getDoc } from "firebase/firestore";
import { db } from "../firebase";

import ItemType from "../models/itemType";
import useUserStore from "../store/user";
import CategoryType from "../models/categoryType";

export const fetchItemsByCategory: (
  category: CategoryType,
) => Promise<ItemType[]> = async (category) => {
  const userId = useUserStore.getState().id;
  const userDocRef = doc(db, "user-data", userId);
  const userDoc = await getDoc(userDocRef);
  const data = userDoc.data();
  const items: Array<ItemType> = data?.items || [];
  const filteredItems = items?.filter((item) => item.type === category);

  return filteredItems;
};

export const fetchUserData: () => Promise<{
  nickname: string;
  coin: number;
}> = async () => {
  const userId = useUserStore.getState().id;
  const userDocRef = doc(db, "user-data", userId);
  const userDoc = await getDoc(userDocRef);
  const data = userDoc.data();

  const nickname: string = data?.nickname || "";
  const coin: number = data?.coin || 0;

  return { nickname, coin };
};

export const fetchItem: (
  itemId: string | undefined,
) => Promise<ItemType | undefined> = async (itemId) => {
  if (itemId === undefined) return undefined;

  const userId = useUserStore.getState().id;
  const userDocRef = doc(db, "user-data", userId);
  const userDoc = await getDoc(userDocRef);
  const data = userDoc.data();
  const items: Array<ItemType> = data?.items || [];

  return items?.find(({ id }) => id === itemId) || undefined;
};
