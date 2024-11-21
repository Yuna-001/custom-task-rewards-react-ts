import { styled } from "styled-components";

const ActionButton = styled.button`
  padding: 1rem 1.4rem;
  font-size: 1rem;
  cursor: pointer;
  border-radius: 1rem;
  background-color: #ccc7be;
  font-weight: 600;
  transition-duration: 0.2s;
  &:hover {
    background-color: #f9e09c;
  }
`;

export default ActionButton;
