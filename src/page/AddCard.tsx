import { Link } from "react-router-dom";
import styled from "styled-components";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus } from "@fortawesome/free-solid-svg-icons";

import Card from "../components/UI/Card";
import useCategory from "../hooks/useCategory";

const AddButton = styled(Link)`
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  transition-duration: 0.3s;
  &:hover {
    scale: 1.1;
  }
`;

const AddCard: React.FC = () => {
  const category = useCategory();

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
