import styled from "styled-components";
import { Form } from "react-router-dom";

import Input from "./Input";
import AuthType from "../../models/authType";

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

const AuthForm: React.FC<{ authState: AuthType }> = ({ authState }) => {
  return (
    <StyledForm method="post">
      {authState === "signup" && (
        <Input type="text" id="nickname" label="닉네임" />
      )}
      <Input type="text" id="id" label="아이디" />
      <Input type="password" id="password" label="비밀번호" />
      <SubmitButton>
        {authState === "login" ? "로그인" : "회원가입"}
      </SubmitButton>
    </StyledForm>
  );
};

export default AuthForm;