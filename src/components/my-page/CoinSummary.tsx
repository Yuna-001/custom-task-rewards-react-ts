import { useQuery } from "@tanstack/react-query";
import { styled } from "styled-components";

import { useEffect } from "react";
import { fetchUserData } from "../../api/userApi";
import coinsImg from "../../assets/coins.svg";
import media from "../../media";
import useErrorStore from "../../store/error";
import CoinData from "../UI/CoinData";

const CoinInfo = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-around;
  background-color: #e4e0d5;
  padding: 1.5rem 1rem;
  border-radius: 1rem;
  margin-top: 2rem;
  margin-bottom: 3rem;

  ${media.small`
    gap:0.5rem;
    flex-direction: column;
  `}
`;

const CoinStatus = styled.div`
  width: 50%;
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 1rem;

  ${media.small`
    width:100%;
  `}
`;

const CoinSummary = () => {
  const addError = useErrorStore((state) => state.addError);

  const { data, isError, error } = useQuery({
    queryKey: ["user-data"],
    queryFn: fetchUserData,
  });

  useEffect(() => {
    if (isError && error) {
      addError(error.message);
    }
  }, [isError, error]);

  if (isError) return null;

  const currentCoin = data?.coin || 0;
  const totalCoin = data?.totalCoin || 0;

  return (
    <CoinInfo>
      <CoinStatus>
        <div>현재 코인</div>
        <CoinData image={coinsImg} coin={currentCoin} />
      </CoinStatus>
      <CoinStatus>
        <div>누적 코인 </div>
        <CoinData image={coinsImg} coin={totalCoin} />
      </CoinStatus>
    </CoinInfo>
  );
};

export default CoinSummary;
