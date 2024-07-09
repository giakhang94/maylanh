import { useState } from "react";
import { useAppContext } from "../Context/appContext";
import { FaCircleChevronDown } from "react-icons/fa6";
import { Navigate, useNavigate } from "react-router-dom";
interface Props {}
const Navbar = (props: Props): React.JSX.Element => {
  const nav = useNavigate();
  const [showLogout, setShowLogout] = useState<boolean>(false);
  const { user, logout } = useAppContext();
  let { email } = user;
  const indexofAtsite = email.indexOf("@");
  email = email.slice(0, indexofAtsite);
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
          <span className="font-semibold italic tracking-[1px] ">{email}</span>
          <FaCircleChevronDown size={19} />
        </div>
        {showLogout && (
          <button
            onClick={() => {
              logout();
              nav("/");
            }}
            className="bg-red-300 text-red-500 font-semibold tracking-[1px] py-1 px-2 rounded-sm absolute top-[100%] mt-1 right-0"
          >
            Logout
          </button>
        )}
      </div>
    </div>
  );
};

export default Navbar;
