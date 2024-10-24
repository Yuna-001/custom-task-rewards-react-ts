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

import media from "../../media";
import ActionButton from "../UI/ActionButton";
import ItemInput from "./ItemInput";
import usePath from "../../hooks/usePath";
import {
  createNewItem,
  deleteItem,
  fetchItem,
  queryClient,
  updateItem,
} from "../../utils/http";
import ItemType from "../../models/itemType";

const StyledForm = styled(Form)`
  width: 50%;
  padding: 3rem 0 4rem;
  position: absolute;
  left: 50%;
  transform: translateX(-50%);
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
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

const DeleteButtonContainer = styled.div`
  display: flex;
  justify-content: right;
  margin-bottom: -1.5rem;
`;

const DeleteButton = styled.div`
  color: #74726e;
  padding: 0.5rem;
  cursor: pointer;
  transition-duration: 0.2s;
  &:hover {
    color: red;
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
  const isDetail = !isCreating && !isEditing;

  const { data: item } = useQuery({
    queryKey: ["items", category, itemId],
    queryFn: () => fetchItem(category, itemId),
    enabled: itemId !== undefined,
  });

  let actiontBtn = <></>;

  if (isEditing) {
    actiontBtn = <SubmitButton type="submit">저장</SubmitButton>;
  } else if (isCreating) {
    actiontBtn = <SubmitButton type="submit">추가</SubmitButton>;
  } else {
    actiontBtn = (
      <ActionButton>
        <Link to="edit">편집</Link>
      </ActionButton>
    );
  }

  const navigate = useNavigate();

  const { mutate } = useMutation({
    mutationFn: isCreating ? createNewItem : updateItem,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["items", category],
      });
      navigate(`/${userId}/${category}`);
    },
  });

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const data = new FormData(event.currentTarget);

    const title = data.get("title")?.toString().trim() || "";
    const coinString = data.get("coin")?.toString().trim() || "";
    const coin = Number(coinString);
    const endDate = data.get("endDate")?.toString().trim() || "";
    const description = data.get("description")?.toString().trim() || "";

    const item: ItemType = {
      id: itemId ?? uuidv4(),
      title,
      coin,
      endDate,
      description,
    };

    mutate({ category, item });
  };

  const { mutate: mutateDeleteItem } = useMutation({
    mutationFn: deleteItem,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["items", category],
        refetchType: "none",
      });
      navigate(`/${userId}/${category}`);
    },
  });

  const handleDelete: () => void = () => {
    if (itemId) {
      mutateDeleteItem({ category, itemId });
    }
  };

  return (
    <StyledForm method={isCreating ? "POST" : "PATCH"} onSubmit={handleSubmit}>
      {!isCreating && (
        <DeleteButtonContainer>
          <DeleteButton onClick={handleDelete}>삭제</DeleteButton>
        </DeleteButtonContainer>
      )}
      <ItemInput
        type="text"
        id="title"
        label={category === "tasks" ? "제목" : "이름"}
        defaultValue={item?.title ?? ""}
        disabled={isDetail}
        required
      />
      <ItemInput
        type="number"
        id="coin"
        label={category === "tasks" ? "완료 시 얻을 수 있는 코인" : "가격"}
        defaultValue={item?.coin ? item.coin : ""}
        disabled={isDetail}
        required
      />
      {category === "tasks" && (
        <ItemInput
          type="date"
          id="endDate"
          label="기한"
          defaultValue={item?.endDate ?? ""}
          disabled={isDetail}
        />
      )}
      <ItemInput
        id="description"
        label="설명"
        isTextarea
        defaultValue={item?.description ?? ""}
        disabled={isDetail}
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
