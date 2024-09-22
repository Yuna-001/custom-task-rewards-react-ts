import { useEffect, useState } from "react";
import { useActionData } from "react-router-dom";
import styled from "styled-components";

import AuthForm from "../components/auth/AuthForm";
import AuthModeType from "../models/authModeType";

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
  const [authMode, setAuthMode] = useState<AuthModeType>("login");
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (data && isActionData(data) && data.message) {
      setError(data.message);
    }
  }, [data]);

  const handleChangeAuthMode = (mode: AuthModeType) => {
    setAuthMode(mode);
    setError(null);
  };

  return (
    <>
      <Title>할 일 보상 관리 앱</Title>
      <Container>
        <AuthForm authMode={authMode} onAuthModeChange={handleChangeAuthMode} />
        <ErrorBox>{error ?? ""}</ErrorBox>
      </Container>
    </>
  );
};

export default AuthPage;
