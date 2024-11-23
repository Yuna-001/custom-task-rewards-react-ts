import { Outlet } from "react-router-dom";
import styled from "styled-components";
import MyPageHeader from "../header/MyPageHeader";

const Layout = styled.main`
  width: 80%;
  padding-bottom: 4rem;
  position: absolute;
  left: 50%;
  transform: translateX(-50%);
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
