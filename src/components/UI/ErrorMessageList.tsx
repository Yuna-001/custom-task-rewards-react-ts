import { useEffect, useRef } from "react";
import styled, { keyframes } from "styled-components";
import useErrorStore from "../../store/error";

const MessageList = styled.ul`
  position: fixed;
  bottom: 1rem;
  right: 2rem;
  /* top: 1rem; */
  /* left: 50%;
  transform: translateX(-50%); */
  display: flex;
  flex-direction: column-reverse;
  gap: 1rem;
  text-align: center;
  z-index: 10;
`;

const fadeIn = keyframes`
  from {
    opacity: 0;
    transform: translateY(-10px); /* 위에서 부드럽게 내려오도록 */
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
`;

const Message = styled.li`
  background-color: #f44336;
  color: white;
  padding: 10px;
  font-size: 0.8rem;
  border-radius: 4px;
  width: 18rem;
  animation: ${fadeIn} 0.3s ease-out;
`;

const ErrorMessageList = () => {
  const { errors, removeError } = useErrorStore();
  const prevLength = useRef<number>(0);

  useEffect(() => {
    // 에러가 새로 추가될 때만 setTimeout 설정
    if (errors.length > prevLength.current) {
      setTimeout(() => {
        removeError();
      }, 2500);
    }

    prevLength.current = errors.length;
  }, [errors.length]);

  return (
    <MessageList>
      {errors.map(({ message, id }) => (
        <Message key={id}>{message}</Message>
      ))}
    </MessageList>
  );
};

export default ErrorMessageList;
