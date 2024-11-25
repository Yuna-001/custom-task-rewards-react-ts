import styled from "styled-components";
import useAuthModeStore from "../../store/authMode";
import useAuthErrorMessageStore from "../../store/authErrorMessage";
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

const AuthMenu: React.FC = () => {
  const { authMode, setAuthMode } = useAuthModeStore((state) => ({
    authMode: state.authMode,
    setAuthMode: state.setAuthMode,
  }));

  const clearErrorMessage = useAuthErrorMessageStore(
    (state) => state.clearErrorMessage,
  );

  const handleClick = (mode: AuthModeType) => {
    if (mode !== authMode) {
      clearErrorMessage();
      setAuthMode(mode);
    }
  };

  return (
    <Menu>
      <MenuItem
        className={authMode === "login" ? "active" : undefined}
        onClick={() => handleClick("login")}
      >
        로그인
      </MenuItem>
      <MenuItem
        className={authMode === "signup" ? "active" : undefined}
        onClick={() => handleClick("signup")}
      >
        회원가입
      </MenuItem>
    </Menu>
  );
};

export default AuthMenu;
