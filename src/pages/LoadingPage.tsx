import styled, { keyframes } from "styled-components";

const loading = keyframes`
    0% {
        color: black;
    }
    50% {
        color: #ada8a1;
    }
    100% {
        color: black;
    }
`;

const Loading = styled.div`
  margin-top: 5rem;
  text-align: center;
  animation: ${loading} 1.2s ease-in-out infinite;
`;

const LoadingPage = () => {
  return <Loading>로딩 중...</Loading>;
};

export default LoadingPage;
