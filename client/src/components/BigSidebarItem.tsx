import { IconType } from "react-icons";
import { NavLink } from "react-router-dom";

interface Props {
  icon: IconType;
  title: string;
  path: string;
  unRead: number;
  hide: boolean;
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
      {!props.hide && <span className="">{props.title}</span>}
      {!!props.unRead && (
        <span
          className={`text-red-500 text-lg font-bold w-fit rounded-full text-center  absolute -top-2  ${
            props.hide ? "left-[8.25px]" : "left-[82.5px]"
          }`}
        >
          {props.unRead && props.unRead <= 500
            ? props.unRead
            : props.unRead
            ? "500+"
            : ""}
        </span>
      )}
    </NavLink>
  );
};

export default BigSidebarItem;
