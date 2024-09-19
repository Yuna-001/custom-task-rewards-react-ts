import {
  Form,
  useParams,
  Link,
  useLocation,
  useNavigate,
} from "react-router-dom";
import styled from "styled-components";
import { useMutation, useQuery } from "@tanstack/react-query";
import { v4 as uuidv4 } from "uuid";

import media from "../media";
import ActionButton from "../components/UI/ActionButton";
import ItemInput from "./ItemInput";
import usePath from "../hooks/usePath";
import {
  createNewItem,
  fetchItem,
  queryClient,
  updateItem,
} from "../util/http";
import ItemType from "../models/itemType";

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
  const { category, userId } = usePath();
  const { itemId } = useParams();

  const { isEditing, isCreating } = useActionButtons();

  const { data: item } = useQuery({
    queryKey: ["items", { category, itemId }],
    queryFn: () => fetchItem(itemId),
    enabled: isEditing,
  });

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

  const navigate = useNavigate();

  const { mutate } = useMutation({
    mutationFn: isCreating ? createNewItem : updateItem,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["items"] });
      navigate(`/${userId}/${category}`);
    },
  });

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const data = new FormData(event.currentTarget);

    const title = data.get("title")?.toString().trim() || "";
    const coin = data.get("coin") ? Number(data.get("coin")) : 0;
    const endDate = data.get("endDate")?.toString().trim() || "";
    const description = data.get("description")?.toString().trim() || "";

    const item: ItemType = {
      type: category,
      id: isCreating ? uuidv4() : userId,
      title,
      coin,
      endDate,
      description,
    };

    mutate(item);
  };

  return (
    <StyledForm method={isCreating ? "POST" : "PATCH"} onSubmit={handleSubmit}>
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
          <Link to={`/${userId}/${category}`}>취소</Link>
        </ActionButton>
        {actiontBtn}
      </ActionButtons>
    </StyledForm>
  );
};

export default ItemForm;
