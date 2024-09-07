import styled from "styled-components";

import { numberFormatting } from "../../util/numberFormatting";

const Coins = styled.p`
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
