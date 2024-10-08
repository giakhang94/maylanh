import { IconType } from "react-icons";
import { NavLink } from "react-router-dom";

interface Props {
  icon: IconType;
  title: string;
  path: string;
  unRead: number;
}

const SmallSidebarItem = (props: Props) => {
  const Icon = props.icon;
  return (
    <NavLink
      end
      to={`${props.path}`}
      className={({ isActive, isPending, isTransitioning }) =>
        [
          isPending ? "pending" : "",
          isActive ? "active" : "",
          isTransitioning ? "transitioning" : "",
          "flex justify-center items-center space-x-5",
          "relative",
        ].join(" ")
      }
    >
      <Icon size={19} />
      {!!props.unRead && (
        <span className="text-white bg-red-500 text-[10px] w-4 h-4 rounded-full flex justify-center items-center absolute top-0 left-[20%]">
          {props.unRead ? props.unRead : ""}
        </span>
      )}
    </NavLink>
  );
};

export default SmallSidebarItem;
