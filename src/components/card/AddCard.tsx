import { Link } from "react-router-dom";
import styled from "styled-components";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus } from "@fortawesome/free-solid-svg-icons";

import Card from "./Card";
import usePath from "../../hooks/usePath";

const AddButton = styled(Link)`
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
`;

const AddCard: React.FC = () => {
  const { category, userId } = usePath();

  if (category === "log") {
    return null;
  }

  return (
    <Card>
      <AddButton
        to={`/${userId}/${category}/add`}
        aria-label={`새 ${category === "tasks" ? "할 일" : "보상"} 추가 버튼`}
      >
        <FontAwesomeIcon icon={faPlus} size="8x" color="#F7F5E8" />
      </AddButton>
    </Card>
  );
};

export default AddCard;
