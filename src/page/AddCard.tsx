import { Link } from "react-router-dom";
import styled from "styled-components";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus } from "@fortawesome/free-solid-svg-icons";

import Card from "../components/UI/Card";
import CategoryType from "../models/categoryType";

const AddButton = styled(Link)`
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  transition-duration: 0.3s;
  &:hover {
    cursor: pointer;
    scale: 1.1;
  }
`;

const AddCard: React.FC<{ category: CategoryType }> = ({ category }) => {
  if (category === "storage") {
    return <></>;
  }

  return (
    <Card>
      <AddButton to={`/home/${category}/add`}>
        <FontAwesomeIcon icon={faPlus} size="8x" color="#F7F5E8" />
      </AddButton>
    </Card>
  );
};

export default AddCard;
