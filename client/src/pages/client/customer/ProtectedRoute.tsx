import { Loading } from "@/components";
import { useAppContext } from "@/Context/appContext";
import { Navigate, Outlet } from "react-router-dom";

const ProtectedRoute = () => {
  const { isLoadingClient, client } = useAppContext();
  if (isLoadingClient) return <Loading classname="" />;
  if (!client) {
    return <Navigate to="/customer/login" />;
  }
  return <Outlet />;
};

export default ProtectedRoute;
