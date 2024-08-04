import styled from "styled-components";

import coinsImg from "../../assets/coins.svg";

const Data = styled.div`
  margin: 1rem;
  display: flex;
  align-items: center;
  gap: 1rem;
`;

const Nickname = styled.p`
  margin: 0;
`;

const Coins = styled.p`
  margin: 0;
  display: flex;
  align-items: center;
  gap: 0.3rem;
`;

const UserData: React.FC = () => {
  return (
    <Data>
      <Nickname>닉네임</Nickname>
      <Coins>
        <img src={coinsImg} alt="동전" width={32} />
        <span>5,000</span>
      </Coins>
    </Data>
  );
};

export default UserData;
