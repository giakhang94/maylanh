import { Loading } from "@/components";
import { useAppContext } from "@/Context/appContext";
import { Navigate } from "react-router-dom";

const ProtectedRoute = ({ children }: any) => {
  const { isLoadingClient, client } = useAppContext();
  if (isLoadingClient) return <Loading classname="" />;
  if (!client) {
    return <Navigate to="/customer/login" />;
  }
  return children;
};

export default ProtectedRoute;
