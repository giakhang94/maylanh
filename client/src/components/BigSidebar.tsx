import { MdSpaceDashboard } from "react-icons/md";
import { FaShoppingCart, FaUser } from "react-icons/fa";
import Logo from "./Logo";
interface Props {}
const BigSideBar = (props: Props): React.JSX.Element => {
  return (
    <div className="w-[30%] max-w-[300px] flex flex-col justify-start items-start space-y-5 my-2 h-screen bg-white">
      <div className="flex flex-col justify-center items-start space-y-5 my-2  px-4 text-2xl">
        <div className="mb-5">
          <Logo />
        </div>
        <div className="flex justify-center items-center space-x-5">
          <MdSpaceDashboard size={30} />
          <span className="">Dashboard</span>
        </div>
        <div className="flex justify-center items-center space-x-5">
          <FaShoppingCart size={30} />
          <span className="">Order</span>
        </div>
        <div className="flex justify-center items-center space-x-5">
          <FaUser size={30} />
          <span className="">Login</span>
        </div>
      </div>
    </div>
  );
};

export default BigSideBar;
