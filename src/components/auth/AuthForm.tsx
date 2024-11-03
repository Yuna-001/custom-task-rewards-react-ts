import styled from "styled-components";
import { Form } from "react-router-dom";

import AuthInput from "./AuthInput";
import AuthMenu from "./AuthMenu";
import useErrorMessageStore from "../../store/errorMessage";
import useAuthModeStore from "../../store/authMode";
import useInput from "../../hooks/useInput";

const Authentication = styled.section`
  background-color: #d6cfc6e6;
  width: 26rem;
  display: flex;
  flex-direction: column;
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
  margin-top: 1.5rem;
  color: black;
  font-weight: bold;

  &:disabled {
    cursor: default;
    opacity: 0.5;
  }
`;

const StyledForm = styled(Form)`
  width: 100%;
  display: flex;
  flex-flow: column;
  align-items: center;
  gap: 0.5rem;
  padding-top: 2rem;
  padding-bottom: 2rem;
`;

const AuthForm: React.FC = () => {
  const clearErrorMessage = useErrorMessageStore(
    (state) => state.clearErrorMessage,
  );

  const authMode = useAuthModeStore((state) => state.authMode);

  const {
    enteredValue: enteredId,
    hasError: idHasError,
    errorMessage: idErrorMessage,
    handleInputChange: handleIdChange,
  } = useInput("id");

  const {
    enteredValue: enteredPassword,
    hasError: passwordHasError,
    errorMessage: passwordErrorMessage,
    handleInputChange: handlePasswordChange,
  } = useInput("password");

  const {
    enteredValue: enteredNickname,
    hasError: nicknameHasError,
    errorMessage: nicknameErrorMessage,
    handleInputChange: handleNicknameChange,
  } = useInput("nickname");

  const disabled =
    idHasError ||
    passwordHasError ||
    (authMode === "signup" && nicknameHasError);

  return (
    <Authentication>
      <AuthMenu />
      <StyledForm method="POST" onFocus={() => clearErrorMessage()}>
        {authMode === "signup" && (
          <AuthInput
            type="text"
            id="nickname"
            label="닉네임"
            value={enteredNickname}
            onChange={handleNicknameChange}
            hasError={nicknameHasError}
            errorMessage={nicknameErrorMessage}
          />
        )}
        <AuthInput
          type="text"
          id="id"
          label="아이디"
          value={enteredId}
          onChange={handleIdChange}
          hasError={idHasError}
          errorMessage={idErrorMessage}
        />
        <AuthInput
          type="password"
          id="password"
          label="비밀번호"
          value={enteredPassword}
          onChange={handlePasswordChange}
          hasError={passwordHasError}
          errorMessage={passwordErrorMessage}
        />
        <SubmitButton disabled={disabled}>
          {authMode === "login" ? "로그인" : "회원가입"}
        </SubmitButton>
      </StyledForm>
    </Authentication>
  );
};

export default AuthForm;
