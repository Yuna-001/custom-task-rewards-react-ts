import { useState } from "react";
import { redirect } from "react-router-dom";

import styled from "styled-components";
import AuthForm from "./AuthForm";
import AuthMenu from "./AuthMenu";
import AuthType from "../../models/authType";

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
  const [authState, setAuthState] = useState<AuthType>("login");

  const handleChooseAuthState = (state: AuthType) => {
    setAuthState(state);
  };

  return (
    <Container>
      <Title>Custom Task Rewards App</Title>
      <Main>
        <AuthMenu authState={authState} onClick={handleChooseAuthState} />
        <AuthForm authState={authState} />
      </Main>
    </Container>
  );
};

export default Authentication;

export const action = async () => {
  return redirect("/home");
};
