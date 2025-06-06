import styled from "styled-components";

import { useQuery } from "@tanstack/react-query";
import { useEffect } from "react";
import { fetchUserData } from "../../api/userApi";
import coinsImg from "../../assets/coins.svg";
import useErrorStore from "../../store/error";
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
  const addError = useErrorStore((state) => state.addError);

  const { data, isError, error } = useQuery({
    queryKey: ["user-data"],
    queryFn: fetchUserData,
  });

  const nickname = data?.nickname || "";
  const coin = data?.coin || 0;

  useEffect(() => {
    if (isError && error) {
      addError(error.message);
    }
  }, [isError, error]);

  if (isError) return null;

  return (
    <Data>
      <Nickname>{nickname}</Nickname>
      <CoinData image={coinsImg} coin={coin} />
    </Data>
  );
};

export default UserData;
