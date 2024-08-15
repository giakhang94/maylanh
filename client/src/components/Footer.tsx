import Logo from "./Logo";

const Footer = () => {
  return (
    <div className="h-[82.5px] w-full bg-white flex space-x-10 justify-between px-10 items-center fixed bottom-0 z-50 border shadow-sm shadow-gray-300">
      <Logo />
      <div className="flex items-center space-x-2">
        <span>email@gmail.com</span> -{" "}
        <span className="font-semibold text-sky-500">039.247.6956</span>{" "}
      </div>
    </div>
  );
};

export default Footer;
