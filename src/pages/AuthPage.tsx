import { useEffect } from "react";
import { useActionData } from "react-router-dom";
import styled from "styled-components";

import AuthForm from "../components/auth/AuthForm";
import useErrorMessageStore from "../store/errorMessage";

const ErrorBox = styled.p`
  margin-top: 20px;
  height: 3rem;
  text-align: center;
  color: red;
`;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: calc(100vh - 10rem);
`;

const Title = styled.h1`
  width: 100%;
  margin: 2rem 0 3rem;
  text-align: center;
`;

type ActionData = {
  message?: string;
  status?: number;
};

const isActionData = (data: any): data is ActionData => {
  return data && typeof data.message === "string";
};

const AuthPage: React.FC = () => {
  const data = useActionData();

  const { errorMessage, setErrorMessage } = useErrorMessageStore((state) => ({
    errorMessage: state.errorMessage,
    setErrorMessage: state.setErrorMessage,
  }));

  useEffect(() => {
    if (data && isActionData(data) && data.message) {
      setErrorMessage(data.message);
    }
  }, [data, setErrorMessage]);

  return (
    <>
      <Title>할 일 보상 관리</Title>
      <Container>
        <AuthForm />
        <ErrorBox>{errorMessage}</ErrorBox>
      </Container>
    </>
  );
};

export default AuthPage;
