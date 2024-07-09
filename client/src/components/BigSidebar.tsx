import { IconType } from "react-icons";
import { sidebarItemList } from "./Constant";
import Logo from "./Logo";
import BigSidebarItem from "./BigSidebarItem";
interface Props {}
const BigSideBar = (props: Props): React.JSX.Element => {
  return (
    <div className="w-[30%] max-w-[300px] flex flex-col justify-start items-start space-y-5 my-2 h-screen bg-white">
      <div
        id="sidebar_item"
        className="flex flex-col justify-center items-start space-y-5 my-2  px-4 text-2xl"
      >
        <div className="mb-5">
          <Logo />
        </div>
        {sidebarItemList.map(
          (
            item: { icon: IconType; title: string; path: string },
            index: number
          ) => {
            return (
              <BigSidebarItem
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
