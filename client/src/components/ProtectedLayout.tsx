import { PropsWithChildren } from "react";

import { Navigate } from "react-router-dom";

import { useAppContext } from "../Context/appContext";
import Loading from "./Loading";

const ProtectedLayout: React.FC<PropsWithChildren> = ({ children }) => {
  const { user, isLoadingUser } = useAppContext();

  if (isLoadingUser) return <Loading classname="h-screen" />;
  if (!user) {
    return <Navigate to="/" />;
  }

  return <>{children}</>;
};

export default ProtectedLayout;
