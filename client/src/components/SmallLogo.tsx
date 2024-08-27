import logoImg from "@/assets/image/Hiu Logo Cam.png";
interface Props {
  size?: "xl" | "2xl";
}
const SmallLogo = (prop: Props): React.JSX.Element => {
  return (
    <div
      className={`flex justify-center items-center space-x-2 font-semibold h-[80px] w-fit`}
    >
      <img src={logoImg} alt="logo" className="h-full w-full" />
    </div>
  );
};
export default SmallLogo;
