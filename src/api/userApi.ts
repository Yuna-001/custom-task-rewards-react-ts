import {
  doc,
  getDoc,
  updateDoc,
  DocumentReference,
  DocumentData,
  deleteDoc,
} from "firebase/firestore";
import { db } from "../firebase";

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

export const updateUserCoin: (
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

export const identifierToId: () => Promise<string> = async () => {
  try {
    const identifier = sessionStorage.getItem("user");

    if (!identifier) return "";

    const identifierDocRef = doc(db, "identifiers", identifier);
    const identifierDoc = await getDoc(identifierDocRef);
    const id = identifierDoc.data()?.id;

    return id;
  } catch (error) {
    throw new Error("사용자의 데이터를 불러오는 데 실패하였습니다.");
  }
};

export const deleteAccount = async () => {
  try {
    const identifier = sessionStorage.getItem("user") || "";
    const identifierDocRef = doc(db, "identifiers", identifier);

    const userId = await identifierToId();
    const userDocRef = doc(db, "users", userId);

    await deleteDoc(identifierDocRef);
    await deleteDoc(userDocRef);
  } catch (error) {
    throw new Error("계정 삭제에 실패하였습니다.");
  }
};

export const editNickname = async (enteredNickname: string) => {
  try {
    const userId = await identifierToId();
    const userDocRef = doc(db, "users", userId);

    await updateDoc(userDocRef, {
      nickname: enteredNickname,
    });
  } catch (error) {
    throw new Error("닉네임 변경에 실패하였습니다.");
  }
};

export const isDuplicatedId = async (id: string) => {
  const userDocRef = doc(db, "users", id);
  const userDoc = await getDoc(userDocRef);

  return userDoc.exists();
};
