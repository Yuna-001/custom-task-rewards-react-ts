import { ReactNode } from "react";
import { styled } from "styled-components";
import { dateFormatting } from "../../utils/formatting";

const TextButtons = styled.div`
  width: 100%;
  display: grid;
  grid-template-columns: 1fr 1fr;
  margin-bottom: -0.5rem;
`;

const CompletedDate = styled.div`
  width: 100%;
  margin-bottom: -0.5rem;
  color: #74726e;
  padding: 1rem 1.5rem;
`;

interface FooterProps {
  category: string;
  actionBtn1: ReactNode;
  actionBtn2: ReactNode;
  completedDate?: string;
}

const CardFooter: React.FC<FooterProps> = ({
  category,
  actionBtn1,
  actionBtn2,
  completedDate,
}) => {
  if (category === "log") {
    return (
      <CompletedDate>
        {completedDate ? dateFormatting(completedDate) : ""}
      </CompletedDate>
    );
  }

  return (
    <TextButtons>
      {actionBtn1}
      {actionBtn2}
    </TextButtons>
  );
};

export default CardFooter;
