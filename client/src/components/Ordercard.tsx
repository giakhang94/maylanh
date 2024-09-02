import { MdCancel, MdDone } from "react-icons/md";
import handleSetFlagOrder from "@/utils/handleSetFlagOrder";
import { useEffect, useState } from "react";
import { OrderType } from "@/pages/dashboard/Order";
import dateFormat from "dateformat";
import { useAppContext } from "@/Context/appContext";
import Wrapper from "@/pages/dashboard/Component/OrderStyledWrapper";

interface Props {
  index: number;
  order: OrderType;
  color: string;
  forWho: "client" | "admin";
}

interface Flag {
  cancel: boolean;
  done: boolean;
  isRead: boolean;
}

const OrderCard = ({
  index,
  order,
  color,
  forWho,
}: Props): React.JSX.Element => {
  const { getUnread, read, unRead } = useAppContext();
  const [flag, setFlag] = useState<Flag>({
    cancel: false,
    done: false,
    isRead: false,
  });

  useEffect(() => {
    setFlag((prev) => ({
      ...prev,
      cancel: order.cancel,
      done: order.done,
      isRead: order.isRead,
    }));
  }, []);

  return (
    <div
      key={index + "orderAdmin"}
      className={`${
        order.clientCancel ? "opacity-60" : ""
      } flex items-center space-x-3 h-full mb-8`}
    >
      <Wrapper color={order.color}>
        <div
          className={`relative Ptablet:w-[150px] PbigTablet:w-[150px] Plaptop:w-[150px] Pdesktop:w-[150px] Pmobile:w-[100px] Psmallmobile:w-[80px] Ptablet:h-[150px] PbigTablet:h-[120px] Plaptop:h-[150px] Pdesktop:h-[150px] Pmobile:h-[110px] Psmallmobile:h-[120px]  text-white rounded-md font-semibold Ptablet:text-xl PbigTablet:text-xl Plaptop:text-xl Pdesktop:text-xl Pmobile:text-sm Psmallmobile:text-sm p-5 text-center flex justify-center items-center`}
          id={order._id}
        >
          {order.serviceName}

          <button disabled={flag.done || order.clientCancel} className="group">
            <MdCancel
              size={20}
              className={`hover:scale-110 absolute top-2 left-2 ${
                flag.done || order.clientCancel ? "opacity-50" : ""
              } `}
              onClick={() => {
                if (forWho === "admin") {
                  handleSetFlagOrder({ type: "cancel", id: order._id });
                  handleSetFlagOrder({ type: "read", id: order._id });

                  if (flag.cancel === true) {
                    setFlag((prev) => ({ ...prev, cancel: false }));
                  } else {
                    setFlag((prev) => ({
                      ...prev,
                      cancel: true,
                      done: false,
                      isRead: true,
                    }));
                  }
                } else {
                  handleSetFlagOrder({ type: "client_cancel", id: order._id });
                  setFlag((prev) => ({ ...prev, cancel: true }));
                }
              }}
            />
            <span className="text-sm color-white font-bold absolute top-2 left-8 hidden group-hover:block">
              {order.clientCancel ? "Đơn đã hủy" : "Hủy đặt hẹn"}
            </span>
          </button>

          {forWho === "admin" && (
            <button
              className={`${
                flag.cancel || order.clientCancel ? "opacity-50" : ""
              }`}
              disabled={flag.cancel || order.cancel}
            >
              <MdDone
                size={20}
                className="absolute top-2 right-2"
                onClick={() => {
                  if (forWho === "admin") {
                    handleSetFlagOrder({ type: "done", id: order._id });
                    handleSetFlagOrder({ type: "read", id: order._id });

                    if (flag.done === true) {
                      setFlag((prev) => ({ ...prev, done: false }));
                    } else {
                      setFlag((prev) => ({
                        ...prev,
                        done: true,
                        cancel: false,
                        isRead: true,
                      }));
                    }
                  }
                }}
              />
            </button>
          )}
          {flag.isRead && forWho === "admin" && (
            <button
              className="group"
              onClick={() => {
                handleSetFlagOrder({ type: "unRead", id: order._id });
                read();
                setFlag((prev) => ({ ...prev, isRead: false }));
              }}
            >
              <div className="w-2 h-2 bg-white rounded-full absolute bottom-1 right-1"></div>
              <span className="text-sm absolute right-0 bottom-0  w-[120px] hidden group-hover:block">
                Mark as read
              </span>
            </button>
          )}
        </div>
      </Wrapper>
      <div className="relative Ptablet:w-[300px] PbigTablet:w-[300px] Plaptop:w-[300px] Pdesktop:w-[300px] Pmobile:w-[200px] Psmallmobile:w-[180px] Ptablet:text-xl PbigTablet:text-xl Plaptop:text-xl Pdesktop:text-xl Pmobile:text-sm Psmallmobile:text-sm">
        <p className="font-bold">Khách hàng: {order.name}</p>
        <p>{order.phone}</p>
        <p>{order.address}</p>
        <p>{order.note}</p>
        <p className="italic text-gray-500">
          {dateFormat(order.createdAt, "fullDate")}
        </p>
        {flag.done && (
          <span
            onClick={() => {}}
            className="absolute top-5 right-10 text-green-500 font-bold text-lg tracking-[2px] block w-fit py-[1px] -rotate-12 px-1 border-[3px] border-green-500 cursor-pointer hover:opacity-85 hover:scale-110"
          >
            DONE
          </span>
        )}
        {flag.cancel && (
          <span
            onClick={() => {}}
            className="absolute top-5 right-10 text-red-500 font-bold text-lg tracking-[2px] block w-fit py-[1px] -rotate-12 px-1 border-[3px] border-red-500 cursor-pointer hover:opacity-85 hover:scale-110"
          >
            Canceled
          </span>
        )}
        {order.clientCancel && (
          <span
            onClick={() => {}}
            className="absolute top-10 right-10 text-red-500 font-bold text-lg tracking-[2px] block w-fit py-[1px] -rotate-12 px-1 border-[3px] border-red-500 hover:opacity-85 hover:scale-110"
          >
            Client Canceled
          </span>
        )}
        {!flag.isRead && !flag.done && !flag.cancel && forWho === "admin" && (
          <span
            onClick={() => {
              handleSetFlagOrder({ type: "read", id: order._id });
              unRead();
              setFlag((prev) => ({ ...prev, isRead: true }));
            }}
            className="absolute top-5 right-10 text-blue-500 font-bold text-lg tracking-[2px] block w-fit py-[1px] -rotate-12 px-1 border-[3px] border-blue-500 cursor-pointer hover:opacity-85 hover:scale-110"
          >
            NEW
          </span>
        )}
      </div>
    </div>
  );
};

export default OrderCard;
