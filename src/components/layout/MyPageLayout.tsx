import { Suspense } from "react";
import { Outlet } from "react-router-dom";
import styled from "styled-components";

import MyPageHeader from "../header/MyPageHeader";
import LoadingPage from "../../pages/LoadingPage";

const Layout = styled.main`
  width: 80%;
  margin: 0 auto;
`;

const MyPageLayout = () => {
  return (
    <Layout>
      <MyPageHeader />
      <Suspense fallback={<LoadingPage />}>
        <Outlet />
      </Suspense>
    </Layout>
  );
};

export default MyPageLayout;
