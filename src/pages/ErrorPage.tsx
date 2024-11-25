import { useRouteError } from "react-router-dom";
import { styled } from "styled-components";

import MainHeader from "../components/header/MainHeader";

const Message = styled.h1`
  font-size: 1.5rem;
  margin: 10rem 0;
  text-align: center;
  font-style: italic;
`;

const ErrorPage = () => {
  const error = useRouteError();
  const errorMessage =
    error instanceof Error ? error.message : "오류가 발생했습니다.";

  return (
    <>
      <MainHeader />
      <Message>{errorMessage}</Message>
    </>
  );
};

export default ErrorPage;
