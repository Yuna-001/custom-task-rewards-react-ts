import { Outlet } from "react-router-dom";
import styled from "styled-components";
import MyPageHeader from "../header/MyPageHeader";

const Layout = styled.main`
  width: 80%;
  margin: 0 auto;
`;

const MyPageLayout = () => {
  return (
    <Layout>
      <MyPageHeader />
      <Outlet />
    </Layout>
  );
};

export default MyPageLayout;
