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
import TextButton from "../UI/TextButton";
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
import CloneTaskButton from "./CloneTaskButton";
import LogToTaskButton from "./LogToTaskButton";
import ActionButton from "../UI/ActionButton";
import useErrorStore from "../../store/error";

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

const TextButtons = styled.div`
  display: flex;
  justify-content: right;
  align-items: center;
  gap: 0.3rem;
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
    color: #e74c3c;
  }
`;

const useTextButtons = () => {
  const { pathname } = useLocation();
  const isEditing = pathname.endsWith("/edit");
  const isCreating = pathname.endsWith("/add");

  return { isEditing, isCreating };
};

const ItemForm: React.FC = () => {
  const { category, userId } = usePath();
  const { itemId } = useParams();

  const { isEditing, isCreating } = useTextButtons();
  const isDetail = !isCreating && !isEditing;

  const { data: item } = useQuery({
    queryKey: ["items", category, itemId],
    queryFn: () => fetchItem(category, itemId),
    enabled: itemId !== undefined,
  });

  let actiontBtn = <></>;

  if (category === "log") {
    actiontBtn = <LogToTaskButton item={item} />;
  } else if (isEditing) {
    actiontBtn = <ActionButton type="submit">저장</ActionButton>;
  } else if (isCreating) {
    actiontBtn = <ActionButton type="submit">추가</ActionButton>;
  } else {
    actiontBtn = (
      <TextButton>
        <Link to="edit">편집</Link>
      </TextButton>
    );
  }

  const navigate = useNavigate();

  const addError = useErrorStore((state) => state.addError);

  const { mutate } = useMutation({
    mutationFn: isCreating ? createNewItem : updateItem,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["items", category],
      });
      navigate(`/${userId}/${category}`);
    },
    onError: (error) => {
      addError(error.message);
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
    onError: (error) => {
      addError(error.message);
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
        label={category === "rewards-shop" ? "이름" : "제목"}
        defaultValue={item?.title ?? ""}
        disabled={isDetail}
        required
      />
      {category === "log" && (
        <ItemInput
          type="date"
          id="completedDate"
          label="완료일"
          defaultValue={item?.completedDate || ""}
          disabled={true}
          required
        />
      )}
      <ItemInput
        type="number"
        id="coin"
        label={category === "rewards-shop" ? "가격" : "완료 후 획득 코인"}
        defaultValue={item?.coin ? item.coin : ""}
        disabled={isDetail}
        required
        max={category === "rewards-shop" ? 9999999999999 : 9999}
      />
      {category !== "rewards-shop" && (
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
      <TextButtons>
        <TextButton>
          <Link to={`/${userId}/${category}`}>목록으로</Link>
        </TextButton>
        {category !== "rewards-shop" && !isCreating && (
          <CloneTaskButton item={item} />
        )}
        {actiontBtn}
      </TextButtons>
    </StyledForm>
  );
};

export default ItemForm;
