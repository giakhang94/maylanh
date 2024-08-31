import { OrderType } from "@/pages/dashboard/Order";

const getOrderCardColor = (order: OrderType) => {
  let color = "bg-sky-500";
  if (order.serviceName === "Vệ sinh máy giặt ngang") {
    color = "bg-green-500";
  }
  if (order.serviceName === "Vệ sinh máy lạnh vip") {
    color = "bg-violet-400";
  }
  if (order.serviceName === "Vệ sinh máy giặt đứng") {
    color = "bg-red-500";
  }
  return color;
};
export default getOrderCardColor;
