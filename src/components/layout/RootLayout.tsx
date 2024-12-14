import MainHeader from "../header/MainHeader";
import { Outlet } from "react-router-dom";
import ErrorMessageList from "../UI/ErrorMessageList";
import { Suspense } from "react";
import LoadingPage from "../../pages/LoadingPage";

const RootLayout: React.FC = () => {
  return (
    <>
      <ErrorMessageList />
      <MainHeader />
      <Suspense fallback={<LoadingPage />}>
        <Outlet />
      </Suspense>
    </>
  );
};

export default RootLayout;
