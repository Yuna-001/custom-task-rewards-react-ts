import styled from "styled-components";

const TextButton = styled.div`
  color: #5a5954;
  font-weight: 600;
  padding: 1rem 1.2rem;
  cursor: pointer;
  transition-duration: 0.2s;
  text-align: center;

  &:hover {
    color: black;
    text-decoration: underline;
    text-underline-offset: 4px;
  }
`;

export default TextButton;
