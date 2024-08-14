import { OrderCard } from "@/components";
import customAxios from "@/utils/authFecth";
import getOrderCardColor from "@/utils/getOrderCardColor";
import { useEffect, useState } from "react";
import { ToastContainer } from "react-toastify";
import Filter, { QueryState } from "./Component/Filter";

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
  clientCancel: boolean;
}

const Order = (props: Props): React.JSX.Element => {
  const [orders, setOrders] = useState<OrderType[]>();
  const [query, setQuery] = useState<string>("");
  const getQuery = (queryInput: string) => {
    setQuery(queryInput);
  };
  useEffect(() => {
    const getOrders = async () => {
      try {
        const { data } = await customAxios().get(`/order?${query}`);
        console.log(data.filter);
        setOrders(data.orders);
      } catch (error) {
        console.log(error);
      }
    };
    getOrders();
  }, [query]);
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
      <div>
        <Filter handleSubmit={getQuery} />
      </div>
      <p className="block mx-5 mt-5">
        Có tổng cộng{" "}
        <span className="font-bold text-sky-800">
          {orders && orders.length} kết quả
        </span>
      </p>
      <div className="p-5 grid Plaptop:grid-cols-2 Pdesktop:grid-cols-2 PbigTablet:grid-cols-2 Ptablet:grid-cols-1 Pmobile:grid-cols-1 Psmallmobile:grid-cols-1">
        {orders &&
          orders.map((order: OrderType, index: number) => {
            const color = getOrderCardColor(order);
            return (
              <OrderCard
                forWho="admin"
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
