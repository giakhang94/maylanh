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
            <div className="relative group bg-sky-500 text-white font-bold p-1 mr-1 rounded-md inline-block cursor-pointer">
              Huy
              <a
                className="h-[80px] w-[120px] absolute -top-[82px] hidden group-hover:block p-1 bg-sky-500 rounded-md "
                target="_blank"
                href="https://www.facebook.com/messages/t/100004288573720"
              >
                <img
                  className="h-full w-full rounded-md opacity-85 border-[4px] border-white"
                  src="https://scontent.fsgn5-15.fna.fbcdn.net/v/t39.30808-6/440331103_2754324814720444_3507658667104867229_n.jpg?_nc_cat=101&ccb=1-7&_nc_sid=833d8c&_nc_ohc=BJlyGtXru2EQ7kNvgGIv0yK&_nc_ht=scontent.fsgn5-15.fna&oh=00_AYAtlS1hVAotV-rsnljRpcTAjNVoziQbbkKm0HEUWiBUtg&oe=66C7EC68"
                  alt=""
                />
                <span className="font-bold tracking-1 text-sm absolute top-[10px] right-[10px] block bg-white text-sky-500 rounded-md px-1">
                  chat FB
                </span>
              </a>
            </div>
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
