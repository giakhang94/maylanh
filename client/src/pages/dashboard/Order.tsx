import { OrderCard } from "@/components";
import customAxios from "@/utils/authFecth";
import { useEffect, useState } from "react";
import { ToastContainer } from "react-toastify";

interface Props {}
export interface OrderType {
  _id: string;
  phone: number;
  name: number;
  address: number;
  createdAt: Date;
  updatedAt?: Date;
  createdBy?: any;
  note: string;
  serviceName: string;
  cancel: boolean;
  done: boolean;
  isRead: boolean;
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
    <>
      <ToastContainer
        position="top-right"
        autoClose={500}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="colored"
        className="mt-[150px] mr-5 text-xl"
      />
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
              <OrderCard
                order={order}
                color={color}
                index={index}
                key={index + "orderCardParent"}
              />
            );
          })}
      </div>
    </>
  );
};

export default Order;
