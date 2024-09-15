import styled from "styled-components";

const Container = styled.div`
  height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const Title = styled.h1`
  margin: 2rem 0 3rem;
  text-align: center;
`;

const Content = styled.main`
  flex-grow: 1;
`;

const AuthPageLayout: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  return (
    <Container>
      <Title>Custom Task Rewards App</Title>
      <Content>{children}</Content>
    </Container>
  );
};

export default AuthPageLayout;
