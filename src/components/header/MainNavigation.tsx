import styled from "styled-components";
import { NavLink } from "react-router-dom";

import media from "../../media";

const Nav = styled.nav`
  width: 60%;
  ${media.small`
    width:100%;
    order : 3;
   `}
`;

const LinkList = styled.ul`
  height: 100%;
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  margin: 0;
  padding: 0;
`;

const LinkItem = styled(NavLink)`
  width: 100%;
  display: block;
  margin: 0;
  padding: 1.5rem 0;
  text-align: center;
  transition-duration: 0.2s;
  &:hover {
    background-color: #ada8a1;
    color: #ffffff;
  }
`;

const MainNavigation: React.FC = () => {
  return (
    <Nav>
      <LinkList>
        <li>
          <LinkItem to="tasks">할 일</LinkItem>
        </li>
        <li>
          <LinkItem to="rewards">상점</LinkItem>
        </li>
        <li>
          <LinkItem to="storage">보관함</LinkItem>
        </li>
      </LinkList>
    </Nav>
  );
};

export default MainNavigation;
