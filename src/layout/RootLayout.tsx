import MainHeader from "../components/header/MainHeader";
import { Outlet } from "react-router-dom";

const RootLayout: React.FC = () => {
  return (
    <>
      <MainHeader />
      <Outlet />
    </>
  );
};

export default RootLayout;
