import { OrderType } from "@/pages/dashboard/Order";

const getOrderCardColor = (order: OrderType) => {
  let color = "";
  if (order.serviceName === "Bơm dầu bạc hà") {
    color = "bg-green-500";
  }
  if (order.serviceName === "Lông vịt dép đứt mủ bể") {
    color = "bg-violet-400";
  }
  if (order.serviceName === "Bơm gas hột quẹt") {
    color = "bg-red-500";
  }
  return color;
};
export default getOrderCardColor;
