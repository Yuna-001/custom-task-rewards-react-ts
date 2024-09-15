import { json, redirect } from "react-router-dom";
import { setDoc, doc, getDoc } from "firebase/firestore";
import { db } from "../../firebase";

type AuthUser = {
  id: string;
  password: string;
  nickname?: string;
};

const authAction: (args: { request: Request }) => Promise<Response> = async ({
  request,
}) => {
  const data = await request.formData();
  const id = data.get("id")?.toString().trim() || "";
  const password = data.get("password")?.toString().trim() || "";
  const nickname = data.get("nickname")?.toString().trim() || "";
  const authMode = data.get("authMode")?.toString().trim() || "";

  const user: AuthUser = {
    id,
    password,
  };

  if (authMode === "signup") user.nickname = nickname;

  if (authMode !== "signup" && authMode !== "login") {
    throw json({ message: "유효하지 않은 인증 모드입니다." }, { status: 400 });
  }

  validateUserData(user, authMode);

  try {
    if (authMode === "signup") {
      await signup(user);
    } else {
      await login(user);
    }
  } catch (error) {
    if (
      error instanceof Error &&
      (error.message.includes("비밀번호가 틀렸습니다.") ||
        error.message.includes("존재하지 않는 아이디입니다."))
    ) {
      // 인증 오류: 로그인 실패 (401 Unauthorized)
      throw json({ message: error.message }, { status: 401 });
    } else {
      // 서버 오류: 예기치 않은 오류 (500 Internal Server Error)
      throw json({ message: "서버에 오류가 발생했습니다." }, { status: 500 });
    }
  }

  return redirect("/home");
};

const validateUserData: (user: AuthUser, authMode: string) => void = (
  user,
  authMode,
) => {
  if (!user.id || !user.password) {
    throw json(
      { message: "아이디와 비밀번호는 필수 입력 항목입니다." },
      { status: 400 },
    );
  }

  if (authMode === "signup" && !user.nickname) {
    throw json(
      { message: "회원가입 시 닉네임은 필수입니다." },
      { status: 400 },
    );
  }

  // 추가적인 유효성 검사
};

const signup: (user: AuthUser) => Promise<void> = async (user) => {
  const userDocRef = doc(db, "user-data", user.id);
  await setDoc(userDocRef, user);
};

const verifyPassword: (
  inputPassword: string,
  storedPassword: string,
) => boolean = (inputPassword, storedPassword) => {
  return inputPassword === storedPassword;
};

const login: (user: AuthUser) => Promise<void> = async (user) => {
  // Firestore에서 사용자 문서 조회
  const userDocRef = doc(db, "user-data", user.id);
  const userDoc = await getDoc(userDocRef);

  if (userDoc.exists()) {
    const userData = userDoc.data();
    if (userData && verifyPassword(user.password, userData.password)) {
      // 로그인 성공
      console.log("로그인 성공");
    } else {
      // 비밀번호 불일치
      throw new Error("비밀번호가 틀렸습니다.");
    }
  } else {
    // 사용자가 존재하지 않음
    throw new Error("존재하지 않는 아이디입니다.");
  }
};

export default authAction;
