import { IconType } from "react-icons";
import { sidebarItemList } from "@/Constants/Constant";
import Logo from "./Logo";
import BigSidebarItem from "./BigSidebarItem";
import { useEffect, useState } from "react";
import customAxios from "@/utils/authFecth";
import { FaShoppingCart } from "react-icons/fa";
import { useAppContext } from "@/Context/appContext";
interface Props {}
const BigSideBar = (props: Props): React.JSX.Element => {
  const { unread } = useAppContext();
  //0: dashobard; 1: all service;  2: order;  3: Add service;   4: User
  sidebarItemList[2].unRead = unread;
  return (
    <div className="w-[30%] max-w-[300px] flex flex-col justify-start items-start space-y-5 my-2 h-screen bg-white">
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
              />
            );
          }
        )}
      </div>
    </div>
  );
};

export default BigSideBar;
