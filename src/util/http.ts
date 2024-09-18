import { doc, getDoc } from "firebase/firestore";
import { db } from "../firebase";

import ItemType from "../models/itemType";
import useUserStore from "../store/user";
import CategoryType from "../models/categoryType";

export const getItemsByCategory: (
  category: CategoryType,
) => Promise<ItemType[] | undefined> = async (category) => {
  const userId = useUserStore.getState().id;
  const userDocRef = doc(db, "user-data", userId);
  const userDoc = await getDoc(userDocRef);
  const data = userDoc.data();
  const items: Array<ItemType> | undefined = data?.items;
  const filteredItems = items?.filter((item) => item.type === category);

  return filteredItems;
};
