import { MdSpaceDashboard, MdOutlinePlaylistAdd } from "react-icons/md";
import { FaShoppingCart, FaUser } from "react-icons/fa";
import { BsTools } from "react-icons/bs";
const sidebarItemList = [
  {
    icon: MdSpaceDashboard,
    title: "Dashboard",
    path: "/admin",
  },
  {
    icon: FaShoppingCart,
    title: "Order",
    path: "/admin/order",
  },
  {
    icon: BsTools,
    title: "All Services",
    path: "/admin/all-services",
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
