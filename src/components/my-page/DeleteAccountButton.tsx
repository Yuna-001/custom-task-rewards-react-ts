import { useRef } from "react";
import styled from "styled-components";

import TextButton from "../UI/TextButton";
import DeleteAccountModal from "../modal/DeleteAccountModal";

const DeleteButton = styled(TextButton)`
  width: 10rem;
  margin: 0 auto;
  font-weight: normal;

  &:hover {
    color: #e74c3c;
  }
`;

const DeleteAccountButton = () => {
  const modal = useRef<{
    open: () => void;
    close: () => void;
  }>(null);

  const handleClick = () => {
    modal.current?.open();
  };

  return (
    <>
      <DeleteAccountModal ref={modal} />
      <DeleteButton onClick={handleClick}>탈퇴하기</DeleteButton>
    </>
  );
};

export default DeleteAccountButton;
