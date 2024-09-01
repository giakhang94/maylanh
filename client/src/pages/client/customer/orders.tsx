import { Loading, OrderCard } from "@/components";
import { useAppContext } from "@/Context/appContext";
import customAxios from "@/utils/authFecth";
import { useEffect, useState } from "react";
import { OrderType } from "@/pages/dashboard/Order";
import { ToastContainer } from "react-toastify";
interface Props {}

const OrderByClient = (props: Props): React.JSX.Element => {
  const { isLoadingClient, client } = useAppContext();
  const [orders, setOrders] = useState<OrderType[]>();
  useEffect(() => {
    const getOrdersByClient = async () => {
      try {
        const { data } = await customAxios().get("/order/order-by-client");
        setOrders(data.orders);
      } catch (error: any) {
        console.log(error);
      }
    };
    getOrdersByClient();
  }, []);
  if (isLoadingClient) return <Loading classname="" />;
  return (
    <div className="w-full">
      <div className="ml-20 text-2xl mb-5 mt-1 block w-full text-sky-500">
        Lịch Sử Đặt Hẹn
      </div>
      <ToastContainer
        position="top-right"
        autoClose={5000}
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
      <div className="grid Plaptop:grid-cols-2 Pdesktop:grid-cols-2 PbigTablet:grid-cols-2 Ptablet:grid-cols-2 Pmobile:grid-cols-1 Psmallmobile:grid-cols-1 w-full  place-content-center px-20">
        {orders &&
          orders.map((order: OrderType, index: number) => {
            return (
              <OrderCard
                forWho="client"
                order={order}
                index={index}
                key={index + "order card client"}
                color={"bg-sky-100"}
              />
            );
          })}
      </div>
    </div>
  );
};

export default OrderByClient;
