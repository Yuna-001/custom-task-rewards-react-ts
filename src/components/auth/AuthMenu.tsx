import styled from "styled-components";
import AuthModeType from "../../models/authModeType";

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
  authMode: AuthModeType;
  onClick: (state: AuthModeType) => void;
}> = ({ authMode, onClick }) => {
  return (
    <Menu>
      <MenuItem
        className={authMode === "login" ? "active" : undefined}
        onClick={() => onClick("login")}
      >
        로그인
      </MenuItem>
      <MenuItem
        className={authMode === "signup" ? "active" : undefined}
        onClick={() => onClick("signup")}
      >
        회원가입
      </MenuItem>
    </Menu>
  );
};

export default AuthMenu;
