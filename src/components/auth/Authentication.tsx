import { useState } from "react";
import styled from "styled-components";

import AuthForm from "./AuthForm";
import AuthMenu from "./AuthMenu";
import AuthModeType from "../../models/authModeType";

const Container = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -55%);
`;

const Title = styled.h1`
  padding-bottom: 2rem;
  text-align: center;
`;

const Main = styled.main`
  background-color: #d6cfc6e6;
  width: 25rem;
  display: flex;
  flex-flow: column;
  align-items: center;
  gap: 1rem;
  border-radius: 1rem;
`;

const Authentication: React.FC = () => {
  const [authMode, setAuthMode] = useState<AuthModeType>("login");

  const handleChooseAuthMode = (state: AuthModeType) => {
    setAuthMode(state);
  };

  return (
    <Container>
      <Title>Custom Task Rewards App</Title>
      <Main>
        <AuthMenu authMode={authMode} onClick={handleChooseAuthMode} />
        <AuthForm authMode={authMode} />
      </Main>
    </Container>
  );
};

export default Authentication;
