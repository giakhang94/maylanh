import { MdSpaceDashboard, MdOutlinePlaylistAdd } from "react-icons/md";
import { FaShoppingCart, FaUser } from "react-icons/fa";
import { BsTools } from "react-icons/bs";
import { IconType } from "react-icons";
interface ListType {
  icon: IconType;
  title: string;
  path: string;
  unRead?: number;
}
const sidebarItemList: ListType[] = [
  {
    icon: MdSpaceDashboard,
    title: "Dashboard",
    path: "/admin",
  },
  {
    icon: BsTools,
    title: "All Services",
    path: "/admin/all-services",
  },
  {
    icon: FaShoppingCart,
    title: "Order",
    path: "/admin/order",
  },
  {
    icon: MdOutlinePlaylistAdd,
    title: "Add Service",
    path: "/admin/add-service",
  },
  {
    icon: FaUser,
    title: "User",
    path: "/#",
  },
];

export { sidebarItemList };
