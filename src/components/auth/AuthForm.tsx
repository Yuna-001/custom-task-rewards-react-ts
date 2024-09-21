import { useEffect, useState } from "react";
import styled from "styled-components";
import { Form } from "react-router-dom";

import AuthInput from "./AuthInput";
import AuthMenu from "./AuthMenu";
import AuthModeType from "../../models/authModeType";
import AuthFormValues from "../../models/authFormValues";

const Authentication = styled.section`
  background-color: #d6cfc6e6;
  width: 25rem;
  display: flex;
  flex-flow: column;
  align-items: center;
  gap: 1rem;
  border-radius: 1rem;
`;

const SubmitButton = styled.button`
  width: 90%;
  height: 3rem;
  background-color: #f7f5e8;
  cursor: pointer;
  border-radius: 1rem;
  padding: auto 1rem;
  margin-top: 1rem;
`;

const StyledForm = styled(Form)`
  width: 100%;
  display: flex;
  flex-flow: column;
  align-items: center;
  gap: 1rem;
  padding-top: 1rem;
  padding-bottom: 2rem;
`;

const AuthForm: React.FC<{
  authMode: AuthModeType;
  onAuthModeChange: (mode: AuthModeType) => void;
}> = ({ authMode, onAuthModeChange }) => {
  const [enteredValues, setEnteredValues] = useState<AuthFormValues>({
    id: "",
    password: "",
    nickname: "",
  });

  useEffect(() => {
    setEnteredValues({
      id: "",
      password: "",
      nickname: "",
    });
  }, [authMode]);

  const handleChangeInput: (
    identifier: string,
    enteredValue: string,
  ) => void = (identifier, enteredValue) => {
    setEnteredValues((prevValues) => ({
      ...prevValues,
      [identifier]: enteredValue.trim(),
    }));
  };

  const handleSubmit: () => void = () => {
    onFormSubmit(enteredValues);
  };

  return (
    <Authentication>
      <AuthMenu authMode={authMode} onClick={onAuthModeChange} />
      <StyledForm method="POST">
        <input type="hidden" name="authMode" value={authMode} />
        {authMode === "signup" && (
          <AuthInput
            type="text"
            id="nickname"
            label="닉네임"
            value={enteredValues.nickname}
            onChange={(event) =>
              handleChangeInput("nickname", event.target.value)
            }
          />
        )}
        <AuthInput
          type="text"
          id="id"
          label="아이디"
          value={enteredValues.id}
          onChange={(event) => handleChangeInput("id", event.target.value)}
        />
        <AuthInput
          type="password"
          id="password"
          label="비밀번호"
          value={enteredValues.password}
          onChange={(event) =>
            handleChangeInput("password", event.target.value)
          }
        />
        <SubmitButton>
          {authMode === "login" ? "로그인" : "회원가입"}
        </SubmitButton>
      </StyledForm>
    </Authentication>
  );
};

export default AuthForm;
