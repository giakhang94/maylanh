interface Props {}
const Logo = (prop: Props): React.JSX.Element => {
  return (
    <div className="flex justify-center items-center space-x-2 font-semibold text-2xl">
      <span className="bg-sky-500 py-1 px-2 rounded-md text-white">Hìu</span>
      <span>Engineering</span>
    </div>
  );
};
export default Logo;
