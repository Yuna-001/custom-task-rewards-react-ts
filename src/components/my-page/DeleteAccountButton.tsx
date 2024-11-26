import { useMutation } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";

import { deleteAccount } from "../../api/userApi";
import TextButton from "../UI/TextButton";
import useErrorStore from "../../store/error";

const DeleteButton = styled(TextButton)`
  width: 10rem;
  margin: 0 auto;
  font-weight: normal;

  &:hover {
    color: #e74c3c;
  }
`;

const DeleteAccountButton = () => {
  const navigate = useNavigate();

  const addError = useErrorStore((state) => state.addError);

  const { mutate } = useMutation({
    mutationFn: deleteAccount,
    onSuccess: () => {
      sessionStorage.removeItem("user");
      navigate("/");
    },
    onError: (error) => {
      addError(error.message);
    },
  });

  const handleClick = () => {
    mutate();
  };

  return <DeleteButton onClick={handleClick}>탈퇴하기</DeleteButton>;
};

export default DeleteAccountButton;
