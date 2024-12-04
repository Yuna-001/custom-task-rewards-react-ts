import React, { forwardRef, useImperativeHandle, useRef } from "react";
import { createPortal } from "react-dom";
import styled from "styled-components";

import ActionButton from "../UI/ActionButton";

const Dialog = styled.dialog`
  &[open] {
    position: fixed;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    width: 25rem;
    padding: 1.5rem;
    display: flex;
    flex-direction: column;
    text-align: center;
    border-radius: 1rem;
    background-color: #fdfcf8;
  }
`;

const Content = styled.section`
  height: 15rem;
  display: flex;
  flex-direction: column;
  justify-content: center;
`;

const Buttons = styled.div`
  display: flex;
  width: 100%;
`;

const ButtonContainer = styled.div`
  display: flex;
  width: 50%;
  justify-content: center;
  align-items: center;
`;

const StyledForm = styled.form`
  display: flex;
  width: 50%;
  justify-content: center;
  align-items: center;
`;

const Button = styled(ActionButton)`
  padding: 1rem;
  background-color: #e4e0d5;
  width: 90%;
`;

const Modal = forwardRef<
  {
    open: () => void;
    close: () => void;
  },
  { children?: React.ReactNode; btn?: React.ReactNode; onClose?: () => void }
>(({ children, btn, onClose }, ref) => {
  const dialog = useRef<HTMLDialogElement>(null);

  useImperativeHandle(ref, () => {
    return {
      open: () => {
        dialog.current?.showModal();
      },
      close: () => {
        dialog.current?.close();
      },
    };
  });

  const modal = document.querySelector("#modal");

  const handleClose = () => {
    dialog.current?.close();
    onClose?.();
  };

  return modal
    ? createPortal(
        <Dialog ref={dialog} onSubmit={handleClose}>
          <Content>{children}</Content>
          <Buttons>
            <ButtonContainer>{btn}</ButtonContainer>
            <StyledForm method="dialog">
              <Button>취소</Button>
            </StyledForm>
          </Buttons>
        </Dialog>,
        modal,
      )
    : null;
});

export default Modal;
