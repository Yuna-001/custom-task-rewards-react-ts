import { forwardRef, useImperativeHandle, useRef, useState } from "react";
import { createPortal } from "react-dom";
import { Link } from "react-router-dom";
import styled from "styled-components";

import ActionButton from "../UI/ActionButton";
import { numberFormatting } from "../../utils/formatting";

const Dialog = styled.dialog`
  &[open] {
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

const CoinShortageModal = forwardRef<{
  open: () => void;
  setRequiredCoin: (gap: number) => void;
}>((_, ref) => {
  const dialog = useRef<HTMLDialogElement>(null);

  const [requiredCoin, setRequiredCoin] = useState(0);

  useImperativeHandle(ref, () => {
    return {
      open: () => {
        dialog.current?.showModal();
      },
      setRequiredCoin: (required: number) => {
        setRequiredCoin(required);
      },
    };
  });

  const handleClose = () => {
    dialog.current?.close();
  };

  const modal = document.querySelector("#modal");

  return modal
    ? createPortal(
        <Dialog ref={dialog}>
          <Content>
            <h2>코인이 부족합니다.</h2>
            <p>
              부족한 코인 : <strong>{numberFormatting(requiredCoin)}</strong>
            </p>
          </Content>
          <Buttons>
            <ButtonContainer>
              <Button as={Link} to="../tasks" onClick={handleClose}>
                코인 모으러 가기
              </Button>
            </ButtonContainer>
            <StyledForm method="dialog">
              <Button>취소</Button>
            </StyledForm>
          </Buttons>
        </Dialog>,
        modal,
      )
    : null;
});

export default CoinShortageModal;
