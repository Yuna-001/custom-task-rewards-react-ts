import MainHeader from "../header/MainHeader";
import { Outlet } from "react-router-dom";
import ErrorMessageList from "../UI/ErrorMessageList";

const RootLayout: React.FC = () => {
  return (
    <>
      <ErrorMessageList />
      <MainHeader />
      <Outlet />
    </>
  );
};

export default RootLayout;
