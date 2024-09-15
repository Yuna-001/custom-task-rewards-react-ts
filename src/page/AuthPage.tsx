import { useActionData } from "react-router-dom";
import styled from "styled-components";

import AuthForm from "../components/auth/AuthForm";
import AuthPageLayout from "../layout/AuthPageLayout";

const ErrorBox = styled.p`
  margin-top: 20px;
  text-align: center;
  color: red;
`;

type ActionData = {
  message?: string;
  status?: number;
};

const isActionData = (data: any): data is ActionData => {
  return data && typeof data.message === "string";
};

const AuthPage: React.FC = () => {
  const data = useActionData();

  return (
    <AuthPageLayout>
      <AuthForm />
      {isActionData(data) && data.message && (
        <ErrorBox>{data.message}</ErrorBox>
      )}
    </AuthPageLayout>
  );
};

export default AuthPage;
