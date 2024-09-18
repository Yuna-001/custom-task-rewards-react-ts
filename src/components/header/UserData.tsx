import styled from "styled-components";

import coinsImg from "../../assets/coins.svg";
import CoinData from "../UI/CoinData";
import { useQuery } from "@tanstack/react-query";
import { fetchUserData } from "../../util/http";

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
  const { data } = useQuery({
    queryKey: ["user-data"],
    queryFn: fetchUserData,
  });

  const nickname = data?.nickname || "";
  const coin = data?.coin || 0;

  return (
    <Data>
      <Nickname>{nickname}</Nickname>
      <CoinData image={coinsImg} coin={coin} />
    </Data>
  );
};

export default UserData;
