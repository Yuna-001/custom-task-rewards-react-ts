import { useEffect, useRef } from "react";
import styled from "styled-components";
import useErrorStore from "../../store/error";

const MessageList = styled.ul`
  position: fixed;
  top: 1rem;
  left: 50%;
  transform: translateX(-50%);
  display: flex;
  flex-direction: column-reverse;
  gap: 1rem;
  text-align: center;
  z-index: 10;
`;

const Message = styled.li`
  background-color: #e74c3c;
  color: white;
  padding: 10px;
  font-size: 0.8rem;
  border-radius: 4px;
  width: 16rem;
`;

const ErrorMessageList = () => {
  const { errors, removeError } = useErrorStore();
  const prevLength = useRef<number>(0);

  useEffect(() => {
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
