interface Props {
  size?: "xl" | "2xl";
}
const Logo = (prop: Props): React.JSX.Element => {
  return (
    <div
      className={`flex justify-center items-center space-x-2 font-semibold text-${
        prop.size ? prop.size : "xl"
      }`}
    >
      <span className="bg-sky-500 py-1 px-2 rounded-md text-white">Hìu</span>
      <span className="text-xl">Engineering</span>
    </div>
  );
};
export default Logo;
