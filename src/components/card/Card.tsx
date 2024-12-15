import styled from "styled-components";

const Card = styled.section`
  width: 100%;
  height: 15rem;
  background-color: #e4e0d5;
  padding: 1rem;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  text-align: center;
  border-radius: 1rem;
  transition-duration: 0.3s;

  &:hover {
    transform: scale(1.02);
    box-shadow: 0px 8px 24px rgba(149, 157, 165, 0.2);
  }
`;

export default Card;
