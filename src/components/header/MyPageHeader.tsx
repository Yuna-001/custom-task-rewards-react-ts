import { NavLink } from "react-router-dom";

import usePath from "../../hooks/usePath";

const MyPageHeader = () => {
  const { userId } = usePath();

  return (
    <header>
      <nav>
        <ul>
          <li>
            <NavLink to={`/${userId}/my-page`}>대시보드</NavLink>
          </li>
          <li>
            <NavLink to={`/${userId}/my-page/setting`}>설정</NavLink>
          </li>
        </ul>
      </nav>
    </header>
  );
};

export default MyPageHeader;
