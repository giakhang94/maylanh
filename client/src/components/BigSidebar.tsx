import { IconType } from "react-icons";
import { sidebarItemList } from "@/Constants/Constant";
import Logo from "./Logo";
import BigSidebarItem from "./BigSidebarItem";
import {
  TbLayoutSidebarLeftCollapse,
  TbLayoutSidebarRightCollapse,
} from "react-icons/tb";

import { useAppContext } from "@/Context/appContext";
import { useState } from "react";
interface Props {
  classname: string;
}
const BigSideBar = (props: Props): React.JSX.Element => {
  const { unread } = useAppContext();
  const [hide, setHide] = useState<boolean>(false);
  //0: dashobard; 1: all service;  2: order;  3: Add service;   4: User
  sidebarItemList[2].unRead = unread;
  return (
    <div
      className={` relative w-[30%] ${
        !hide
          ? "Pmobile:max-w-[250px] Psmallmobile:max-w[200px] Ptablet:max-w-[210px] Plaptop:max-w-[300px] Pdesktop:max-w-[300px]"
          : "max-w-[82.5px]"
      } flex flex-col justify-start items-start space-y-5 my-2 h-screen bg-white ${
        props.classname
      }`}
    >
      <div
        id="sidebar_item"
        className="flex flex-col justify-center items-start space-y-5 my-2  px-4 text-xl tracking-[1px]"
      >
        <div className="mb-5">
          <Logo />
        </div>
        {sidebarItemList.map(
          (
            item: {
              icon: IconType;
              title: string;
              path: string;
              unRead?: number;
            },
            index: number
          ) => {
            return (
              <BigSidebarItem
                unRead={item.unRead ? item.unRead : 0}
                icon={item.icon}
                path={item.path}
                title={item.title}
                key={`big sidebar item ${index}`}
                hide={hide}
              />
            );
          }
        )}
      </div>
      {!hide ? (
        <TbLayoutSidebarLeftCollapse
          size={25}
          className="absolute right-1 bottom-10 cursor-pointer hover:text-sky-500"
          onClick={() => {
            setHide(true);
          }}
        />
      ) : (
        <TbLayoutSidebarRightCollapse
          size={25}
          className="absolute right-1 bottom-10 cursor-pointer hover:text-sky-500"
          onClick={() => {
            setHide(false);
          }}
        />
      )}
    </div>
  );
};

export default BigSideBar;
