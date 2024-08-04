import { useState } from "react";
import { useAppContext } from "@/Context/appContext";
import { FaCircleChevronDown } from "react-icons/fa6";
import { Navigate, useNavigate } from "react-router-dom";
interface Props {}
const ClientNavbar = (props: Props): React.JSX.Element => {
  const nav = useNavigate();
  const [showLogout, setShowLogout] = useState<boolean>(false);
  const { user, logout } = useAppContext();
  // let { email } = user && user;
  // const indexofAtsite = email.indexOf("@");
  // email = email.slice(0, indexofAtsite);
  return (
    <div className="w-[100%] flex justify-center p-5 h-[20] bg-white ">
      <div className="flex items-center justify-center space-x-1 relative">
        <span className="italic font-semibold">Welcome, </span>
        <div
          className="flex items-center justify-center rounded-md bg-sky-600 text-white space-x-2 py-1 px-2 cursor-pointer"
          onClick={() => {
            setShowLogout(!showLogout);
          }}
        >
          <span className="font-semibold italic tracking-[1px] ">Guess</span>
          <FaCircleChevronDown size={19} />
        </div>
        {showLogout && (
          <div className=" absolute top-[100%] mt-1 right-0 flex flex-col z-30 bg-white w-[170px]  shadow-sm shadow-gray-300">
            <button
              onClick={() => {
                logout();
                nav("/");
              }}
              className=" text-red-500  hover:bg-sky-200 hover:py-1 font-semibold tracking-[1px] py-1 px-2 rounded-sm w-full text-left"
            >
              Logout
            </button>
            <button className=" text-sky-500 hover:bg-sky-200 hover:py-1 font-semibold tracking-[1px] py-1 px-2 w-full text-left">
              Lịch sử đặt hẹn
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default ClientNavbar;
