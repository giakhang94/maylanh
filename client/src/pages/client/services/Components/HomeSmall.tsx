import image from "@/assets/image/repair_lading.svg";

import { Link } from "react-router-dom";
const HomeSmall = () => {
  return (
    <div className="mx-auto flex items-center h-screen  Ptablet:w-[450px] Pmobile:w-[350px] Psmallmobile:w-[350px]">
      <div className="w-full mb-[50%]">
        <span className="block text-center">
          <span className="bg-sky-500 text-white font-bold p-1 rounded-md mr-1">
            Huy
          </span>
          <span>Vệ Sinh Máy Lạnh</span>
        </span>
        <img src={image} className="w-full" alt="Image" />
        <div className="flex justify-center space-x-1">
          <Link
            to="/services"
            className="w-[250px] text-center bg-sky-500 text-white font-semibold py-2 px-3  rounded-sm mt-5 hover:opacity-85"
          >
            Đặt Hẹn
          </Link>
          <a
            href="tel:0392476956"
            className="w-[250px] bg-white text-center text-sky-500 border-[2px] border-sky-500 font-semibold py-2 px-3 rounded-sm mt-5 hover:opacity-85"
          >
            Hoặc Gọi Tui
          </a>
        </div>
      </div>
    </div>
  );
};

export default HomeSmall;
