import { useEffect, useState } from "react";
import { useActionData } from "react-router-dom";
import styled from "styled-components";

import AuthForm from "../components/auth/AuthForm";
import AuthPageLayout from "../layout/AuthPageLayout";
import AuthModeType from "../models/authModeType";

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
  const [authMode, setAuthMode] = useState<AuthModeType>("login");
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (data && isActionData(data) && data.message) {
      setError(data.message);
    }
  }, [data]);

  const handleChangeAuthMode = (mode: AuthModeType) => {
    setAuthMode(mode);
    setError(null);
  };

  return (
    <AuthPageLayout>
      <AuthForm authMode={authMode} onAuthModeChange={handleChangeAuthMode} />
      {error && <ErrorBox>{error}</ErrorBox>}
    </AuthPageLayout>
  );
};

export default AuthPage;
