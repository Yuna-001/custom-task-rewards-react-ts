import styled from "styled-components";
import { Form } from "react-router-dom";

import AuthInput from "./AuthInput";
import AuthModeType from "../../models/authModeType";

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

const AuthForm: React.FC<{ authMode: AuthModeType }> = ({ authMode }) => {
  return (
    <StyledForm method="POST">
      <input type="hidden" name="authMode" value={authMode} />
      {authMode === "signup" && (
        <AuthInput type="text" id="nickname" label="닉네임" />
      )}
      <AuthInput type="text" id="id" label="아이디" />
      <AuthInput type="password" id="password" label="비밀번호" />
      <SubmitButton>
        {authMode === "login" ? "로그인" : "회원가입"}
      </SubmitButton>
    </StyledForm>
  );
};

export default AuthForm;
