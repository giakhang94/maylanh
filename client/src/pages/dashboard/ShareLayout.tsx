import { Outlet } from "react-router-dom";
import { BigSidebar, Navbar } from "@/components";
import SmallSidebar from "@/components/SmallSidebar";

interface Props {}
const ShareLayout = (props: Props): React.JSX.Element => {
  return (
    <>
      <div className="flex w-[full] bg-slate-100 ">
        <div className={`relative `}>
          {/* <BigSidebar classname="Psmallmobile:hidden Pmobile:hidden Ptablet:flex Plaptop:flex Pdesktop:flex" />
          <SmallSidebar classname="Psmallmobile:flex Pmobile:flex Ptablet:hidden Plaptop:hidden Pdesktop:hidden" /> */}
          <BigSidebar classname="Psmallmobile:hidden Pmobile:hidden Ptablet:flex Plaptop:flex Pdesktop:flex" />
          <SmallSidebar classname="Psmallmobile:flex Pmobile:flex Ptablet:hidden Plaptop:hidden Pdesktop:hidden" />
        </div>
        <div className="flex-1 bg-slate-100">
          <Navbar />
          <div className="">
            <Outlet />
          </div>
        </div>
      </div>
    </>
  );
};
export default ShareLayout;
