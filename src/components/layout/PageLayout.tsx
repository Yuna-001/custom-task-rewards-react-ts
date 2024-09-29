import styled from "styled-components";

import media from "../../media";

const PageLayout = styled.main`
  width: 80%;
  padding: 4rem 0;
  position: absolute;
  left: 50%;
  transform: translateX(-50%);
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 3rem;
  align-items: center;
  justify-content: left;

  ${media.medium`
    grid-template-columns: repeat(2, 1fr);
  `}

  ${media.small`
    grid-template-columns: 1fr;
  `}
`;

export default PageLayout;
