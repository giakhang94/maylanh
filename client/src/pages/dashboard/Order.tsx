import { OrderCard } from "@/components";
import customAxios from "@/utils/authFecth";
import { useEffect, useState } from "react";
import { ToastContainer } from "react-toastify";
import Filter, { QueryState } from "./Component/Filter";
import Pagination from "./Component/Pagination";
import PaginationDotDot from "./Component/PaginationDotDot";
import { useAppContext } from "@/Context/appContext";
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
  color: string;
}

const Order = (props: Props): React.JSX.Element => {
  const [orders, setOrders] = useState<OrderType[]>();
  const [pagiInfo, setPagiInfo] = useState<{
    numOfPages: number;
    totalOrders: number;
    pagePagi: number;
  }>({ numOfPages: 1, totalOrders: 1, pagePagi: 1 });

  const [query, setQuery] = useState<string>("");
  const getQuery = (queryInput: string) => {
    setQuery(queryInput);
  };
  const getOrders = async (page?: string) => {
    try {
      const { data } = await customAxios().get(`/order?${query}&page=${page}`);
      // console.log(data.filter);
      const { numOfPages, totalOrders, pagePagi } = data;
      setPagiInfo({
        numOfPages,
        totalOrders,
        pagePagi,
      });
      setOrders(data.orders);
    } catch (error) {
      console.log(error);
    }
  };
  const handleChangePage = (page: string) => {
    getOrders(page);
  };

  useEffect(() => {
    getOrders("1");
  }, [query]);

  return (
    <div className="w-full">
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
      <div className="w-full flex justify-center">
        <Filter handleSubmit={getQuery} />
      </div>
      <p className="block mx-5 mt-5">
        Có tổng cộng{" "}
        <span className="font-bold text-sky-800">
          {orders && orders.length > 0 ? orders.length : 0} kết quả
        </span>
      </p>
      <div className="p-5 w-full grid Plaptop:grid-cols-2 Pdesktop:grid-cols-2 PbigTablet:grid-cols-2 Ptablet:grid-cols-1 Pmobile:grid-cols-1 Psmallmobile:grid-cols-1">
        {orders &&
          orders.map((order: OrderType, index: number) => {
            return (
              <OrderCard
                forWho="admin"
                order={order}
                color={"bg-sky-100"}
                index={index}
                key={index + "orderCardParent"}
              />
            );
          })}
      </div>
      {/* <Pagination
        total={pagiInfo.totalOrders}
        numOfPages={pagiInfo.numOfPages}
        handleChangePage={handleChangePage}
        page={pagiInfo.pagePagi}
      /> */}
      <PaginationDotDot
        // numOfPages={Number(pagiInfo.numOfPages)}
        numOfPages={Number(pagiInfo.numOfPages)}
        // currentPage={Number(pagiInfo.pagePagi)}
        currentPage={Number(pagiInfo.pagePagi)}
        handleChangePage={handleChangePage}
        total={pagiInfo.totalOrders}
      />
    </div>
  );
};

export default Order;
