import { json, redirect } from "react-router-dom";
import { setDoc, doc, getDoc } from "firebase/firestore";
import { db } from "../../firebase";
import { v4 as uuidv4 } from "uuid";

import Item from "../../models/item";
import useAuthModeStore from "../../store/authMode";
import { isDuplicatedId } from "../../api/userApi";

type AuthUser = {
  id: string;
  password: string;
  nickname?: string;
  identifier?: string;
  coin?: number;
  totalCoin?: number;
  tasks?: Array<Item>;
  "rewards-shop"?: Array<Item>;
  log?: Array<Item>;
};

const authAction: (args: { request: Request }) => Promise<Response> = async ({
  request,
}) => {
  const authMode = useAuthModeStore.getState().authMode;

  const data = await request.formData();
  const id = data.get("id")?.toString().trim() || "";
  const password = data.get("password")?.toString().trim() || "";
  const nickname = data.get("nickname")?.toString().trim() || "";

  const user: AuthUser = {
    id,
    password,
  };

  if (authMode === "signup") {
    user.nickname = nickname;
    user.coin = 0;
    user.totalCoin = 0;
    user.tasks = [];
    user["rewards-shop"] = [];
    user.log = [];
  }

  if (authMode !== "signup" && authMode !== "login") {
    // 처리할 수 없는 엔티티
    return json(
      { message: "유효하지 않은 인증 모드입니다.", status: 422 },
      { status: 422 },
    );
  }

  let identifier: null | string = null;

  try {
    validateUserData(user, authMode);

    if (authMode === "signup") {
      identifier = await signup(user);
    } else {
      identifier = await login(user);
    }
  } catch (error) {
    if (error instanceof Error && error.message.includes("필수")) {
      // 잘못된 요청
      return json({ message: error.message, status: 400 }, { status: 400 });
    }

    if (
      error instanceof Error &&
      (error.message.includes("비밀번호가 틀렸습니다.") ||
        error.message.includes("존재하지 않는 아이디입니다."))
    ) {
      // 인증 오류
      return json({ message: error.message, status: 401 }, { status: 401 });
    }

    if (
      error instanceof Error &&
      error.message.includes("이미 존재하는 아이디입니다.")
    ) {
      // 요청 충돌
      return json({ message: error.message, status: 409 }, { status: 409 });
    }

    return json(
      { message: "서버에 오류가 발생했습니다.", status: 500 },
      { status: 500 },
    );
  }

  if (identifier !== null) sessionStorage.setItem("user", identifier);

  return redirect(`/${id}`);
};

const validateUserData: (user: AuthUser, authMode: string) => void = (
  user,
  authMode,
) => {
  if (!user.id || !user.password) {
    throw new Error("아이디와 비밀번호는 필수 입력 항목입니다.");
  }

  if (authMode === "signup" && !user.nickname) {
    throw new Error("회원가입 시 닉네임은 필수입니다.");
  }
};

const signup: (user: AuthUser) => Promise<string> = async (user) => {
  if (await isDuplicatedId(user.id)) {
    throw new Error("이미 존재하는 아이디입니다.");
  }

  user.identifier = uuidv4();

  const userDocRef = doc(db, "users", user.id);
  const identifierDocRef = doc(db, "identifiers", user.identifier);

  await setDoc(userDocRef, user);
  await setDoc(identifierDocRef, { id: user.id });

  return user.identifier;
};

const login: (user: AuthUser) => Promise<string> = async (user) => {
  // Firestore에서 사용자 문서 조회
  const userDocRef = doc(db, "users", user.id);
  const userDoc = await getDoc(userDocRef);

  if (userDoc.exists()) {
    const userData = userDoc.data();

    if (user.password !== userData.password) {
      throw new Error("비밀번호가 틀렸습니다.");
    }

    return userData.identifier;
  } else {
    throw new Error("존재하지 않는 아이디입니다.");
  }
};

export default authAction;
