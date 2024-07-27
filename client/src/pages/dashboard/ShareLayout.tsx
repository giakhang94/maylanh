import { Outlet } from "react-router-dom";
import { BigSidebar, Navbar } from "@/components";

interface Props {}
const ShareLayout = (props: Props): React.JSX.Element => {
  return (
    <>
      <div className="flex w-full">
        <BigSidebar />
        <div className="flex-1 bg-gray-100 ">
          <Navbar />
          <div>
            <Outlet />
          </div>
        </div>
      </div>
    </>
  );
};
export default ShareLayout;
