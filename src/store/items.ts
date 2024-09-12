import { create } from "zustand";

import ItemType from "../models/itemType";

type ItemStore = {
  items: ItemType[];
  addItem: (item: ItemType) => void;
  removeItem: (id: string) => void;
  updateItem: (updatedItem: ItemType) => void;
  getItemsByType: (type: ItemType["type"]) => ItemType[];
  getItem: (id: string | undefined) => ItemType | undefined;
};

const useItemStore = create<ItemStore>((set, get) => ({
  items: [
    { type: "tasks", id: "HTML100", title: "HTML", coin: 100 },
    { type: "tasks", id: "css1000", title: "CSS", coin: 1000 },
    {
      type: "tasks",
      id: "자바스크립트10000",
      title: "자바스크립트",
      endDate: "2055-09-10",
      description: "JS",
      coin: 10000,
    },
    { type: "tasks", id: "리액트134321", title: "리액트", coin: 134321 },
    {
      type: "tasks",
      id: "스타일드 컴포넌트655500",
      title: "스타일드 컴포넌트",
      coin: 655500,
    },
    { type: "tasks", id: "7", title: "테일윈드", coin: 500 },
    { type: "tasks", id: "8", title: "부트스트랩", coin: 66 },
    {
      type: "rewards-shop",
      id: "하루 휴식10000",
      title: "하루 휴식",
      coin: 10000,
    },
    { type: "rewards-shop", id: "외식2000", title: "외식", coin: 2000 },
    { type: "storage", id: "하루 휴식10000", title: "하루 휴식", coin: 10000 },
  ],

  addItem: (item: ItemType) =>
    set((state) => ({
      items: [...state.items, item],
    })),

  removeItem: (id: string) =>
    set((state) => ({
      items: state.items.filter((item) => item.id !== id),
    })),

  updateItem: (updatedItem: ItemType) =>
    set((state) => ({
      items: state.items.map((item) =>
        item.id === updatedItem.id ? updatedItem : item,
      ),
    })),

  getItemsByType: (type: ItemType["type"]) =>
    get().items.filter((item) => item.type === type),

  getItem: (id: string | undefined) => {
    if (id === undefined) return undefined;
    return get().items.find((item) => item.id === id);
  },
}));

export default useItemStore;
