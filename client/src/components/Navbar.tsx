import Logo from "./Logo";
interface Props {}
const Navbar = (props: Props): React.JSX.Element => {
  return (
    <div className="w-[100%] flex justify-center p-5 h-[20] bg-white ">
      <div>user</div>
    </div>
  );
};

export default Navbar;
