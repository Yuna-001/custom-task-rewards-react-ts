import { useEffect, useMemo, useState } from "react";
import { useActionData } from "react-router-dom";
import styled from "styled-components";

import AuthForm from "../components/auth/AuthForm";

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
  height: 100%;
  padding-bottom: 5rem;
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
  const [errorMessage, setErrorMessage] = useState("");

  const handleRemoveErrorMessage = () => {
    setErrorMessage("");
  };

  useEffect(() => {
    if (data && isActionData(data) && data.message) {
      setErrorMessage(data.message);
    }
  }, [data]);

  const memoizedTitle = useMemo(() => <Title>스스로 어른이</Title>, []);
  const memoizedAuthForm = useMemo(
    () => <AuthForm onRemoveError={handleRemoveErrorMessage} />,
    [],
  );

  return (
    <Container>
      {memoizedTitle}
      {memoizedAuthForm}
      <ErrorBox>{errorMessage}</ErrorBox>
    </Container>
  );
};

export default AuthPage;
