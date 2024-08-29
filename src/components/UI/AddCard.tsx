import { Link } from "react-router-dom";
import styled from "styled-components";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus } from "@fortawesome/free-solid-svg-icons";

import Card from "./Card";

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

const AddCard: React.FC = () => {
  return (
    <Card>
      <AddButton to="add">
        <FontAwesomeIcon icon={faPlus} size="8x" color="#F7F5E8" />
      </AddButton>
    </Card>
  );
};

export default AddCard;
