import customAxios from "@/utils/authFecth";
import { useEffect, useState } from "react";
import { MdCancel, MdDone } from "react-icons/md";

interface Props {}
interface OrderType {
  phone: number;
  name: number;
  address: number;
  createdAt: Date;
  updatedAt?: Date;
  createdBy?: any;
  note: string;
  serviceName: string;
}
const Order = (props: Props): React.JSX.Element => {
  const [orders, setOrders] = useState<OrderType[]>();
  console.log(orders);
  useEffect(() => {
    const getOrders = async () => {
      try {
        const { data } = await customAxios().get("/order");
        setOrders(data.orders);
      } catch (error) {
        console.log(error);
      }
    };
    getOrders();
  }, []);
  return (
    <div className="p-5 grid grid-cols-2">
      {orders &&
        orders.map((order: OrderType, index: number) => {
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
          return (
            <div
              key={index + "orderAdmin"}
              className="flex items-center space-x-3 h-full mb-8"
            >
              <div
                className={`relative w-[150px] h-[130px] ${color} text-white rounded-md font-semibold text-xl p-5 text-center flex justify-center items-center`}
              >
                {order.serviceName}
                <MdCancel
                  size={20}
                  className="absolute top-2 left-2 cursor-pointer"
                  onClick={() => {
                    //handle update order (add cancel flag and auto remove after 30 days)
                  }}
                />
                <MdDone
                  size={20}
                  className="absolute top-2 right-2 cursor-pointer"
                  onClick={() => {
                    alert(order.serviceName);
                    //handle update order (and done flag)
                  }}
                />
              </div>
              <div>
                <p className="font-bold">Khách hàng: {order.name}</p>
                <p>{order.phone}</p>
                <p>{order.address}</p>
                <p>{order.note}</p>
                <p>{order.createdAt.toString()}</p>
              </div>
            </div>
          );
        })}
    </div>
  );
};

export default Order;
