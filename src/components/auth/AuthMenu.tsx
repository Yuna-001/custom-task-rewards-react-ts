import styled from "styled-components";
import AuthType from "../../models/authType";

const Menu = styled.menu`
  width: 100%;
  margin: 0;
  padding: 0;
  background-color: #e4e4d8;
  border-radius: 1rem 1rem 0 0;
`;

const MenuItem = styled.li`
  display: inline-block;
  text-align: center;
  width: 50%;
  background-color: #e4e4d8;
  cursor: pointer;
  border-radius: 1rem 1rem 0 0;
  padding: 1rem;
  &.active {
    background-color: #dad4cb;
  }
`;

const AuthMenu: React.FC<{
  authState: AuthType;
  onClick: (state: AuthType) => void;
}> = ({ authState, onClick }) => {
  return (
    <Menu>
      <MenuItem
        className={authState === "login" ? "active" : undefined}
        onClick={() => onClick("login")}
      >
        로그인
      </MenuItem>
      <MenuItem
        className={authState === "signup" ? "active" : undefined}
        onClick={() => onClick("signup")}
      >
        회원가입
      </MenuItem>
    </Menu>
  );
};

export default AuthMenu;
