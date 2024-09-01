import styled from "styled-components";

import media from "../media";

const PageLayout = styled.main`
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
    grid-template-columns: repeat(auto-fit, minmax(15rem, auto));
  `}
`;

export default PageLayout;
