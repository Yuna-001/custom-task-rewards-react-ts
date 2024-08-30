import MainHeader from "../components/header/MainHeader";
import { Outlet } from "react-router-dom";
import PageLayout from "./PageLayout";

const RootLayout: React.FC = () => {
  return (
    <>
      <MainHeader />
      <Outlet />
    </>
  );
};

export default RootLayout;
