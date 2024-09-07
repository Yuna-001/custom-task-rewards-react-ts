import { Form, useParams, Link } from "react-router-dom";
import styled from "styled-components";

import media from "../media";
import ActionButton from "../components/UI/ActionButton";
import ItemInput from "./ItemInput";

const StyledForm = styled(Form)`
  width: 50%;
  padding: 4rem 0;
  position: absolute;
  left: 50%;
  transform: translateX(-50%);
  display: flex;
  flex-direction: column;
  gap: 1rem;
  font-weight: bold;
  ${media.small`
    width:75%;
  `}
`;

const ActionButtons = styled.div`
  display: flex;
  justify-content: right;
  align-items: center;
  gap: 0.5rem;
`;

const SubmitButton = styled.button`
  padding: 1rem 1.5rem;
  font-size: 1rem;
  cursor: pointer;
  border-radius: 1rem;
  background-color: #ccc7be;
  font-weight: 600;
  transition-duration: 0.2s;
  &:hover {
    background-color: #fff08c;
  }
`;

const ItemForm: React.FC = () => {
  const params = useParams();
  let category = params.category;

  if (category === undefined) {
    category = "tasks";
  }

  if (!["tasks", "rewards-shop", "storage"].includes(category)) {
    // 에러 처리
  }

  return (
    <StyledForm onSubmit={(e) => e.preventDefault()}>
      <ItemInput type="text" id="name" label="이름" />
      <ItemInput type="number" id="coin" label="가격" />
      {category === "tasks" && (
        <ItemInput type="date" id="period" label="기간" />
      )}
      <ItemInput id="description" label="설명" isTextarea />
      <ActionButtons>
        <ActionButton>
          <Link to=".." relative="path">
            취소
          </Link>
        </ActionButton>
        <SubmitButton type="submit">추가</SubmitButton>
      </ActionButtons>
    </StyledForm>
  );
};

export default ItemForm;
