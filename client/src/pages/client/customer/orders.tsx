import { Loading, OrderCard } from "@/components";
import { useAppContext } from "@/Context/appContext";
import customAxios from "@/utils/authFecth";
import { useEffect, useState } from "react";
import { OrderType } from "@/pages/dashboard/Order";
import getOrderCardColor from "@/utils/getOrderCardColor";
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
    <>
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
      <div>
        {orders &&
          orders.map((order: OrderType, index: number) => {
            const color = getOrderCardColor(order);
            return (
              <OrderCard
                forWho="client"
                order={order}
                index={index}
                key={index + "order card client"}
                color={color}
              />
            );
          })}
      </div>
    </>
  );
};

export default OrderByClient;
