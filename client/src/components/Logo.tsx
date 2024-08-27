import logoImg from "@/assets/image/Hiu Logo Cam.png";
interface Props {
  size?: "xl" | "2xl";
  hide?: boolean;
  type?: "1" | "2";
}
const Logo = (prop: Props): React.JSX.Element => {
  let type1 = prop.type ? prop.type : "1";
  if (type1 === "1")
    return (
      <div
        className={`flex justify-center items-center space-x-2 font-semibold text-${
          prop.size ? prop.size : "xl"
        }`}
      >
        <span className="bg-sky-500 py-1 px-2 rounded-md text-white">Huy</span>
        {!prop.hide && <span className="text-xl">RT</span>}
      </div>
    );
  else
    return (
      <div
        className={`flex justify-center items-center space-x-2 font-semibold h-[80px] w-fit`}
      >
        <img src={logoImg} alt="logo" className="h-full w-full" />
      </div>
    );
};
export default Logo;
