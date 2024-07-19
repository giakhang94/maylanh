import { RouteProps } from "react-router-dom";
import {
  ADMIN_ADD_SERVICE_PAGE,
  ADMIN_LIST_SERVICE,
  ADMIN_ORDER,
} from "./paths";
import { AddService, AllService, Dashboard, Order } from "@/pages";

const adminRoutes: RouteProps[] = [
  {
    index: true,
    Component: Dashboard,
  },
  {
    path: ADMIN_ORDER,
    Component: Order,
  },
  {
    path: ADMIN_LIST_SERVICE,
    Component: AllService,
  },
  {
    path: ADMIN_ADD_SERVICE_PAGE,
    Component: AddService,
  },
];

export default adminRoutes;
