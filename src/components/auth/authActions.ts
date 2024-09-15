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

  const user: AuthUser = {
    id: data.get("id") as string,
    password: data.get("password") as string,
  };

  if (data.get("authState") === "signup")
    user.nickname = data.get("nickname") as string;

  try {
    if (data.get("authState") === "signup") {
      await signup(user);
    } else {
      await login(user);
    }
  } catch (error) {
    throw json(error, { status: 500 });
  }

  return redirect("/home");
};

const signup: (user: AuthUser) => Promise<void> = async (user) => {
  try {
    const userDocRef = doc(db, "user-data", user.id);
    await setDoc(userDocRef, user);
  } catch (err) {
    throw new Error(
      "회원가입 중 오류가 발생했습니다. 나중에 다시 시도해주세요.",
    );
  }
};

const verifyPassword = (inputPassword: string, storedPassword: string) => {
  return inputPassword === storedPassword;
};

const login: (user: AuthUser) => Promise<void> = async (user) => {
  try {
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
  } catch (err) {
    throw new Error("로그인 중 오류가 발생했습니다. 나중에 다시 시도해주세요.");
  }
};

export default authAction;
