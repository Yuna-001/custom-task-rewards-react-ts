import styled from "styled-components";

import coinsImg from "../../assets/coins.svg";
import CoinData from "../UI/CoinData";

const Data = styled.div`
  margin: 1rem;
  display: flex;
  align-items: center;
  gap: 1rem;
`;

const Nickname = styled.p`
  margin: 0;
`;

const UserData: React.FC = () => {
  return (
    <Data>
      <Nickname>닉네임</Nickname>
      <CoinData image={coinsImg} coin={5000} />
    </Data>
  );
};

export default UserData;
