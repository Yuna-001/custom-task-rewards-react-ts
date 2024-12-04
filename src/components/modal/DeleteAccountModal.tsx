import { forwardRef } from "react";
import { useNavigate } from "react-router-dom";
import { useMutation } from "@tanstack/react-query";
import { styled } from "styled-components";

import Modal from "./Modal";
import ActionButton from "../UI/ActionButton";
import useErrorStore from "../../store/error";
import { deleteAccount } from "../../api/userApi";

const Button = styled(ActionButton)`
  padding: 1rem;
  background-color: #e4e0d5;
  width: 90%;
`;

const DeleteAccountModal = forwardRef<{
  open: () => void;
  close: () => void;
}>((props, ref) => {
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

  const handleDeleteAccount = () => {
    mutate();
  };

  const btn = <Button onClick={handleDeleteAccount}>삭제</Button>;

  return (
    <Modal ref={ref} btn={btn}>
      <h2>계정을 삭제하시겠습니까?</h2>
    </Modal>
  );
});

export default DeleteAccountModal;
