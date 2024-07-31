import styled from "styled-components";

import coinsImg from "../../assets/coins.svg";

const MyCoinData = styled.p`
  margin: 1rem;
  display: flex;
  align-items: center;
  gap: 0.5rem;
`;

const MyCoins: React.FC = () => {
  return (
    <MyCoinData>
      <img src={coinsImg} alt="동전" width={32} />
      <span>5,000</span>
    </MyCoinData>
  );
};

export default MyCoins;
