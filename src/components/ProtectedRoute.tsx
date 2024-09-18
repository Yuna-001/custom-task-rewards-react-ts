import { useNavigate, useParams } from "react-router-dom";
import useUserStore from "../store/user";
import { useEffect } from "react";

const ProtectedRoute: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const navigate = useNavigate();
  const loggedInUserId = useUserStore((state) => state.id);
  const { userId: routeUserId } = useParams();

  useEffect(() => {
    if (loggedInUserId !== routeUserId) {
      navigate("/");
    }
  }, [loggedInUserId, routeUserId, navigate]);

  return loggedInUserId === routeUserId ? children : null;
};

export default ProtectedRoute;
