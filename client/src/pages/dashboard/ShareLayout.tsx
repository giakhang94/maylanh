import { Outlet } from "react-router-dom";
import { BigSidebar, Navbar } from "@/components";
import SmallSidebar from "@/components/SmallSidebar";

interface Props {}
const ShareLayout = (props: Props): React.JSX.Element => {
  return (
    <>
      <div className="flex w-full">
        <BigSidebar classname="Psmallmobile:hidden Pmobile:hidden Ptablet:flex Plaptop:flex Pdesktop:flex" />
        <SmallSidebar classname="Psmallmobile:flex Pmobile:flex Ptablet:hidden Plaptop:hidden Pdesktop:hidden" />
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
