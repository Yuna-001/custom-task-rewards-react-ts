import { useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { identifierToId } from "../../api/userApi";

const ProtectedRoute: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const navigate = useNavigate();
  const { userId: routeUserId } = useParams();
  const [isConfirmedUser, setIsConfirmedUser] = useState(false);

  useEffect(() => {
    const confirmUser = async () => {
      const loggedInUserId = await identifierToId();

      if (loggedInUserId !== routeUserId) {
        navigate("/");
      } else {
        setIsConfirmedUser(true);
      }
    };

    confirmUser();
  }, [routeUserId]);

  return isConfirmedUser ? children : null;
};

export default ProtectedRoute;
