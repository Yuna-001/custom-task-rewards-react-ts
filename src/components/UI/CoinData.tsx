import styled from "styled-components";

import { numberFormatting } from "../../utils/formatting";

const Coins = styled.div`
  margin: 0;
  display: flex;
  align-items: center;
  gap: 0.3rem;
`;

const CoinData: React.FC<{ image: string; coin: number }> = ({
  image,
  coin,
}) => {
  return (
    <Coins>
      <img src={image} alt="동전" width={32} />
      <div>{numberFormatting(coin)}</div>
    </Coins>
  );
};

export default CoinData;
