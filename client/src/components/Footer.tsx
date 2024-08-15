import Logo from "./Logo";
import SmallLogo from "./SmallLogo";

const Footer = () => {
  return (
    <div className="h-[60px] w-full bg-white flex space-x-10 justify-center px-10 items-center fixed bottom-0 z-50 border shadow-sm shadow-gray-300">
      <div className="Plaptop:block Pdesktop:block PbigTablet:block Ptablet:block Pmobile:hidden Psmallmobile:hidden">
        <SmallLogo />
      </div>
      <div className="flex items-center space-x-2">
        <span>Email: email@gmail.com</span> -{" "}
        <span className="font-semibold text-sky-500">039.247.6956</span>{" "}
      </div>
    </div>
  );
};

export default Footer;
