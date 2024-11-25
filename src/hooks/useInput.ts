import { useCallback, useEffect, useState } from "react";
import { isDuplicatedId } from "../utils/http";
import useAuthModeStore from "../store/authMode";

const useInput = (identifier: "id" | "password" | "nickname") => {
  const [enteredValue, setEnteredValue] = useState<string>("");
  const [hasError, setHasError] = useState<boolean>(true);
  const [errorMessage, setErrorMessage] = useState<string>("");

  const mode = useAuthModeStore((state) => state.authMode);

  const handleInputChange = useCallback(
    async (event: React.ChangeEvent<HTMLInputElement>) => {
      const newValue = event.target.value;
      setEnteredValue(newValue);

      let error = "";

      if (identifier === "id") {
        error = await validateId(newValue, mode);
      } else if (identifier === "password") {
        error = validatePassword(newValue);
      } else {
        error = validateNickname(newValue);
      }

      setHasError(error !== "");
      setErrorMessage(error);
    },
    [identifier, mode],
  );

  useEffect(() => {
    setEnteredValue("");
    setHasError(true);
    setErrorMessage("");
  }, [mode]);

  return {
    enteredValue,
    setEnteredValue,
    hasError,
    errorMessage,
    handleInputChange,
  };
};

export default useInput;

const validateId = async (
  id: string,
  mode: "login" | "signup",
): Promise<string> => {
  if (/\s/.test(id)) {
    return "아이디는 공백을 포함할 수 없습니다.";
  }

  if (/[^A-Za-z0-9]/.test(id)) {
    return "아이디는 영어와 숫자만 포함 가능합니다.";
  }

  if (id.length < 3 || id.length > 20) {
    return "아이디는 3자 이상 20자 이하여야 합니다.";
  }

  if (mode === "signup") {
    const isDuplicated = await isDuplicatedId(id);
    if (isDuplicated) return "이미 존재하는 아이디입니다.";
  }

  return "";
};

const validatePassword = (pw: string): string => {
  if (/\s/.test(pw)) {
    return "비밀번호는 공백을 포함할 수 없습니다.";
  }

  if (/[^a-zA-Z0-9!@#$%^&*?_]/.test(pw)) {
    return "비밀번호는 영문자, 숫자 및 특수문자(!@#$%^&*?_)만 사용할 수 있습니다.";
  }

  if (pw.length < 8 || pw.length > 16) {
    return "비밀번호는 8자 이상 16자 이하여야 합니다.";
  }

  if (!/^(?=.*[a-zA-Z])(?=.*[0-9])(?=.*[!@#$%^&*?_])/.test(pw)) {
    return "비밀번호는 영문자, 숫자 및 특수문자(!@#$%^&*?_)를 포함하여 구성되어야 합니다.";
  }

  return "";
};

const validateNickname = (nickname: string): string => {
  if (nickname.length < 1 || nickname.length > 20) {
    return "닉네임은 1자 이상 20자 이하여야 합니다.";
  }

  if (nickname.trim().length === 0) {
    return "닉네임은 공백만으로 구성될 수 없습니다.";
  }

  return "";
};
