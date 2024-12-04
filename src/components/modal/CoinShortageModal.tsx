import { useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";

import ActionButton from "../UI/ActionButton";
import { numberFormatting } from "../../utils/formatting";
import Modal from "./Modal";
import useRequiredCoinStore from "../../store/requiredCoin";

const Button = styled(ActionButton)`
  padding: 1rem;
  background-color: #e4e0d5;
  width: 90%;
`;

const CoinShortageModal = () => {
  const { requiredCoin, setRequiredCoin } = useRequiredCoinStore();

  const modal = useRef<{
    open: () => void;
    close: () => void;
  }>(null);

  const handleModalClose = () => {
    setRequiredCoin(0);
    modal.current?.close();
  };

  useEffect(() => {
    if (requiredCoin > 0) {
      modal.current?.open();
    }
  }, [requiredCoin]);

  const btn = (
    <Button as={Link} to="../tasks" onClick={handleModalClose}>
      코인 모으러 가기
    </Button>
  );

  return (
    <Modal ref={modal} btn={btn} onClose={handleModalClose}>
      <h2>코인이 부족합니다.</h2>
      <p>
        부족한 코인 : <strong>{numberFormatting(requiredCoin)}</strong>
      </p>
    </Modal>
  );
};

export default CoinShortageModal;
