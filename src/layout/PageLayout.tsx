import { ReactNode } from "react";

const PageLayout: React.FC<{ children: ReactNode }> = ({ children }) => {
  return <main>{children}</main>;
};

export default PageLayout;
