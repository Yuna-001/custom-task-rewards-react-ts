import { ReactNode } from "react";
import styled from "styled-components";

import media from "../media";

const Main = styled.main`
  width: 80%;
  padding: 4rem 0;
  position: absolute;
  left: 50%;
  transform: translateX(-50%);
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(14rem, 1fr));
  gap: 3rem;
  align-items: center;
  ${media.small`
    width : 80%;
    grid-template-columns: repeat(auto-fit, minmax(15rem, auto));
  `}
`;

const PageLayout: React.FC<{ children: ReactNode }> = ({ children }) => {
  return <Main>{children}</Main>;
};

export default PageLayout;
