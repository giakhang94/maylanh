import { IconType } from "react-icons";
import { NavLink } from "react-router-dom";

interface Props {
  icon: IconType;
  title: string;
  path: string;
  unRead: number;
}

const BigSidebarItem = (props: Props) => {
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
      <Icon size={25} />
      <span className="">{props.title}</span>
      {!!props.unRead && (
        <span className="text-white bg-red-500 text-sm w-5 h-5 rounded-full text-center absolute top-0 left-[90%]">
          {props.unRead ? props.unRead : ""}
        </span>
      )}
    </NavLink>
  );
};

export default BigSidebarItem;
