import { NavLink } from "react-router-dom";
import styled from "styled-components";

import usePath from "../../hooks/usePath";

const Header = styled.header`
  width: 100%;
  display: flex;
  justify-content: center;
`;

const Nav = styled.nav`
  padding: 1rem 0;
  width: 100%;
  display: flex;
  justify-content: center;
`;

const LinkList = styled.ul`
  padding: 0;
  display: flex;
  gap: 2rem;
`;

const LinkItem = styled(NavLink)`
  color: #74726e;
  transition-duration: 0.2s;

  &.active {
    color: black;
    border-bottom: 1px solid black;
  }
  &:hover {
    color: black;
  }
`;

const MyPageHeader = () => {
  const { userId } = usePath();

  return (
    <Header>
      <Nav>
        <LinkList>
          <li>
            <LinkItem to={`/${userId}/my-page`} end>
              대시보드
            </LinkItem>
          </li>
          <li>
            <LinkItem to={`/${userId}/my-page/setting`}>설정</LinkItem>
          </li>
        </LinkList>
      </Nav>
    </Header>
  );
};

export default MyPageHeader;
