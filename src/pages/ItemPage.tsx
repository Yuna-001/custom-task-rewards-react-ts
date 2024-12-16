import { Form, useParams, Link, useLocation } from "react-router-dom";
import styled from "styled-components";
import { useQuery } from "@tanstack/react-query";

import media from "../media";
import TextButton from "../components/UI/TextButton";
import ItemInput from "../components/items/ItemInput";
import usePath from "../hooks/usePath";
import { fetchItem } from "../api/itemApi";
import ItemPageActionButtons from "../components/items/ItemPageActionButtons";
import ItemPageMode from "../models/itemPageMode";
import useItemPageActions from "../hooks/useItemPageActions";

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

const useItemMode: () => ItemPageMode = () => {
  const { pathname } = useLocation();

  if (pathname.endsWith("/edit")) {
    return "edit";
  } else if (pathname.endsWith("/add")) {
    return "create";
  }

  return "detail";
};

const ItemPage: React.FC = () => {
  const { category, userId } = usePath();
  const { itemId } = useParams();
  const mode = useItemMode();
  const { handleDelete, handleSubmit } = useItemPageActions(
    category,
    mode,
    itemId,
    userId,
  );

  const { data: item } = useQuery({
    queryKey: ["items", category, itemId],
    queryFn: () => fetchItem(category, itemId),
    enabled: itemId !== undefined,
  });

  return (
    <StyledForm
      method={mode === "create" ? "POST" : "PATCH"}
      onSubmit={handleSubmit}
    >
      {mode !== "create" && (
        <DeleteButtonContainer>
          <DeleteButton onClick={handleDelete}>삭제</DeleteButton>
        </DeleteButtonContainer>
      )}
      <ItemInput
        type="text"
        id="title"
        label={category === "rewards-shop" ? "이름" : "제목"}
        defaultValue={item?.title ?? ""}
        disabled={mode === "detail"}
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
        disabled={mode === "detail"}
        required
        max={category === "rewards-shop" ? 9999999999999 : 99999}
      />
      {category !== "rewards-shop" && (
        <ItemInput
          type="date"
          id="endDate"
          label="기한"
          defaultValue={item?.endDate ?? ""}
          disabled={mode === "detail"}
        />
      )}
      <ItemInput
        id="description"
        label="설명"
        isTextarea
        defaultValue={item?.description ?? ""}
        disabled={mode === "detail"}
      />
      <TextButtons>
        <TextButton>
          <Link to={`/${userId}/${category}`}>목록으로</Link>
        </TextButton>
        <ItemPageActionButtons item={item} category={category} mode={mode} />
      </TextButtons>
    </StyledForm>
  );
};

export default ItemPage;
