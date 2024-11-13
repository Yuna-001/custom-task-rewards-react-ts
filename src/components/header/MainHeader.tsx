import styled from "styled-components";
import { useNavigate } from "react-router-dom";

import media from "../../media";
import UserData from "./UserData";
import MainNavigation from "./MainNavigation";

const Header = styled.header`
  width: 100%;
  margin: 0;
  padding: 0;
  background-color: #d6cfc6e6;
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-wrap: wrap;
`;

const LogoutButton = styled.button`
  margin: 0.7rem 1rem;
  background-color: #f7f5e8;
  cursor: pointer;
  border-radius: 1rem;
  padding: 0.7rem;
  ${media.small`
    order : 2;
  `}
`;

const MainHeader: React.FC = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    sessionStorage.removeItem("user");
    navigate("/");
  };

  return (
    <Header>
      <UserData />
      <MainNavigation />
      <LogoutButton onClick={handleLogout}>로그아웃</LogoutButton>
    </Header>
  );
};

export default MainHeader;
