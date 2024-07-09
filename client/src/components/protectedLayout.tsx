import { useAppContext } from "../Context/appContext";
import { Navigate } from "react-router-dom";
import Loading from "./Loading";
interface Props {}

const ProtectedLayout = ({ children }: any) => {
  const { user, isLoadingUser } = useAppContext();
  // console.log(isLoadingUser);
  // let isLoadingFake = true;
  if (isLoadingUser) return <Loading classname="h-screen" />;
  if (!user) {
    return <Navigate to="/" />;
  }
  return children;
};
export default ProtectedLayout;
