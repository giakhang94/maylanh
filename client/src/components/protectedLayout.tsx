import { useAppContext } from "../Context/appContext";
import { Navigate } from "react-router-dom";
interface Props {}

const ProtectedLayout = ({ children }: any) => {
  const { user, isLoadingUser } = useAppContext();
  console.log(isLoadingUser);
  if (isLoadingUser) return <>loading...</>;
  if (!user) {
    return <Navigate to="/" />;
  }
  return children;
};
export default ProtectedLayout;
