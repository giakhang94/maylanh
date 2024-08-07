import { Outlet } from "react-router-dom";
import ClientNavbar from "../services/ClientNavbar";

interface Props {}
const ShareLayout = (props: Props): React.JSX.Element => {
  return (
    <div>
      <div>
        <ClientNavbar />
      </div>
      <div className="w-full p-3">
        <Outlet />
      </div>
    </div>
  );
};

export default ShareLayout;
