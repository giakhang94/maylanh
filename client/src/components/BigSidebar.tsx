import { IconType } from "react-icons";
import { sidebarItemList } from "@/Constants/Constant";
import Logo from "./Logo";
import BigSidebarItem from "./BigSidebarItem";

import { useAppContext } from "@/Context/appContext";
import { useEffect, useState } from "react";
import {
  TbLayoutSidebarLeftCollapse,
  TbLayoutSidebarRightCollapse,
} from "react-icons/tb";
import { Link } from "react-router-dom";
interface Props {
  classname: string;
}

const BigSideBar = (props: Props): React.JSX.Element => {
  const { unread, getUnread } = useAppContext();
  useEffect(() => {
    getUnread();
  }, []);
  const [hide, setHide] = useState<boolean>(false);

  //0: dashobard; 1: all service;  2: order;  3: Add service;   4: User
  sidebarItemList[2].unRead = unread;
  return (
    <div
      className={`sticky top-0 shadow-sm  flex flex-col justify-start items-start space-y-5  h-[100vh] bg-white ${
        props.classname
      } ${hide ? "w-[80px]" : "w-[200px]"}`}
    >
      <div
        id="sidebar_item"
        className="flex flex-col justify-center items-start space-y-5 my-2  px-4 text-xl tracking-[1px]"
      >
        <Link to="/" className="mb-5">
          <Logo hide={hide} type="2" />
        </Link>
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
          className="absolute left-[82.5%] top-[350px] cursor-pointer hover:text-sky-500 hover:scale-110"
          onClick={() => {
            setHide(true);
          }}
        />
      ) : (
        <TbLayoutSidebarRightCollapse
          size={25}
          className="absolute left-[70%] top-[350px] cursor-pointer hover:text-sky-500 hover:scale-110"
          onClick={() => {
            setHide(false);
          }}
        />
      )}
    </div>
  );
};

export default BigSideBar;
