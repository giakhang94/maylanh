import { useState } from "react";
import { useAppContext } from "@/Context/appContext";
import { FaCircleChevronDown } from "react-icons/fa6";
import { useLocation, useNavigate } from "react-router-dom";
import { Logo } from "@/components";
import SmallLogo from "@/components/SmallLogo";
interface Props {}
const ClientNavbar = (props: Props): React.JSX.Element => {
  const nav = useNavigate();
  const location = useLocation();
  const isServices = location.pathname === "/services";
  // console.log(location.pathname);
  const [showLogout, setShowLogout] = useState<boolean>(false);
  const { client, logoutClient } = useAppContext();
  return (
    <div className="shadow-sm shadow-gray-200 w-[100%] flex justify-between Pdesktop:px-10 Plaptop:px-10 PbigTablet:px-10 Ptablet:px-5 Pmobile:px-3 Psmallmobile:px-2  h-[20] bg-white items-center">
      <div
        className="cursor-pointer Plaptop:block Pdesktop:block PbigTablet:block Ptablet:hidden Pmobile:hidden Psmallmobile:hidden"
        onClick={() => {
          nav("/");
        }}
      >
        <Logo type="2" />
      </div>
      <div
        className="cursor-pointer Plaptop:hidden Pdesktop:hidden PbigTablet:hidden Ptablet:block Pmobile:block Psmallmobile:block"
        onClick={() => {
          nav("/");
        }}
      >
        <SmallLogo />
      </div>
      <div
        onClick={() => {
          nav(`${isServices ? "/customer/order" : "/services"}`);
        }}
      >
        <span className="hover:text-sky-500 text-lg font-semibold tracking-[1px] cursor-pointer Plaptop:block Pdesktop:block PbigTablet:block Ptablet:hidden Psmallmobile:hidden Pmobile:hidden">
          {isServices ? "Xem Lịch Sử Đặt Hẹn" : "Đến Trang Đặt Hẹn"}
        </span>
      </div>
      <div className="flex items-center justify-center space-x-1 relative">
        <span className="italic font-semibold">Welcome, </span>
        <div
          className="flex items-center justify-center rounded-md bg-sky-600 text-white space-x-2 py-1 px-2 cursor-pointer"
          onClick={() => {
            setShowLogout(!showLogout);
          }}
        >
          <span className="font-semibold italic tracking-[1px] ">
            {client && client.phone ? client.phone : "Bạn mới"}
          </span>
          <FaCircleChevronDown size={19} />
        </div>
        {showLogout && (
          <div className=" absolute top-[100%] mt-1 right-0 flex flex-col z-30 bg-white w-[170px]  shadow-sm shadow-gray-300">
            <button
              onClick={() => {
                if (client) {
                  logoutClient();
                  nav("/");
                } else {
                  nav("/customer/login");
                }
              }}
              className={`text-${
                client ? "red-500" : "sky-500"
              } hover:bg-sky-200 hover:py-1 font-semibold tracking-[1px] py-1 px-2 rounded-sm w-full text-left`}
            >
              {client ? "logout" : "login"}
            </button>
            <button
              onClick={() => {
                nav("/customer/order");
              }}
              className=" text-sky-500 hover:bg-sky-200 hover:py-1 font-semibold tracking-[1px] py-1 px-2 w-full text-left"
            >
              Lịch sử đặt hẹn
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default ClientNavbar;
