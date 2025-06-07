import styled, { keyframes } from "styled-components";
import useErrorStore from "../../store/error";

const MessageList = styled.ul`
  position: fixed;
  bottom: 1rem;
  right: 2rem;
  display: flex;
  flex-direction: column-reverse;
  gap: 1rem;
  text-align: center;
  z-index: 10;
`;

const fadeIn = keyframes`
  from {
    opacity: 0;
    transform: translateY(-10px); 
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
  const errors = useErrorStore((state) => state.errors);

  return (
    <MessageList>
      {errors.map(({ message, id }) => (
        <Message key={id}>{message}</Message>
      ))}
    </MessageList>
  );
};

export default ErrorMessageList;
