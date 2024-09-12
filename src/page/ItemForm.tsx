import { Form, useParams, Link, useLocation } from "react-router-dom";
import styled from "styled-components";

import media from "../media";
import ActionButton from "../components/UI/ActionButton";
import ItemInput from "./ItemInput";
import useItemStore from "../store/items";
import useCategory from "../hooks/useCategory";

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
  gap: 0.3rem;
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

const useActionButtons = () => {
  const { pathname } = useLocation();
  const isEditing = pathname.endsWith("/edit");
  const isCreating = pathname.endsWith("/add");

  return { isEditing, isCreating };
};

const ItemForm: React.FC = () => {
  const category = useCategory();
  const { id } = useParams();

  const item = useItemStore((state) => state.getItem(id));

  const { isEditing, isCreating } = useActionButtons();
  let actiontBtn = <></>;

  if (isEditing) {
    actiontBtn = <SubmitButton type="submit">변경</SubmitButton>;
  } else if (isCreating) {
    actiontBtn = <SubmitButton type="submit">추가</SubmitButton>;
  } else {
    actiontBtn = (
      <ActionButton>
        <Link to="edit">편집 시작</Link>
      </ActionButton>
    );
  }

  return (
    <StyledForm onSubmit={(e) => e.preventDefault()}>
      <ItemInput
        type="text"
        id="title"
        label={category === "tasks" ? "제목" : "이름"}
        defaultValue={item?.title ?? ""}
        required
      />
      <ItemInput
        type="number"
        id="coin"
        label={category === "tasks" ? "보수" : "가격"}
        defaultValue={item?.coin ? item.coin : ""}
        required
      />
      {category === "tasks" && (
        <ItemInput
          type="date"
          id="end-date"
          label="기한"
          defaultValue={item?.endDate ?? ""}
        />
      )}
      <ItemInput
        id="description"
        label="설명"
        isTextarea
        defaultValue={item?.description ?? ""}
      />
      <ActionButtons>
        <ActionButton>
          <Link to={`/home/${category}`} relative="path">
            취소
          </Link>
        </ActionButton>
        {actiontBtn}
      </ActionButtons>
    </StyledForm>
  );
};

export default ItemForm;
