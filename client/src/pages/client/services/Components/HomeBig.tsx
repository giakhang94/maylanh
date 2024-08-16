import image from "@/assets/image/repair_lading.svg";
import { Link } from "react-router-dom";
const HomeBig = () => {
  return (
    <div className="w-full flex items-center h-screen px-3">
      <div className="w-1/2 -scale-x-100 min-w-[450px]">
        <img src={image} alt="landing pag w-full" />
      </div>
      <div className="text-xl flex-1 flex-col justify-center mt-5 space-x-2">
        <div className="flex Plaptop:flex-row Pdesktop:flex-row PbigTablet:flex-col Ptablet:flex-col justify-center items-center space-x-1">
          <span>
            <span className="bg-sky-500 text-white font-bold p-1 mr-1 rounded-md">
              Huy
            </span>
            sửa và{" "}
            <span className="text-sky-500 font-semibold tracking-[1px]">
              vệ sinh:
            </span>
          </span>
          <span>Máy Lạnh - Máy Giặt</span>
        </div>
        <div className="flex justify-center space-x-1">
          <Link
            to="/services"
            className="w-[250px] text-center bg-sky-500 text-white font-semibold py-2 px-3  rounded-sm mt-5 hover:opacity-85 hover:scale-110"
          >
            Đặt Hẹn Đi
          </Link>
          <a
            href="tel:0392476956"
            className="w-[250px] bg-white text-center text-sky-500 border-[2px] border-sky-500 font-semibold py-2 px-3 rounded-sm mt-5 hover:opacity-85 hover:scale-110"
          >
            Gọi Tui Liền
          </a>
        </div>
      </div>
    </div>
  );
};

export default HomeBig;
