import { MdCancel, MdDone } from "react-icons/md";
import handleSetFlagOrder from "@/utils/handleSetFlagOrder";
import { useEffect, useState } from "react";
import { OrderType } from "@/pages/dashboard/Order";
import dateFormat from "dateformat";
import { useAppContext } from "@/Context/appContext";

interface Props {
  index: number;
  order: OrderType;
  color: string;
}

interface Flag {
  cancel: boolean;
  done: boolean;
  isRead: boolean;
}

const OrderCard = ({ index, order, color }: Props): React.JSX.Element => {
  const { getUnread } = useAppContext();
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
      className="flex items-center space-x-3 h-full mb-8 "
    >
      <div
        className={`relative w-[150px] h-[130px] ${color} text-white rounded-md font-semibold text-xl p-5 text-center flex justify-center items-center`}
      >
        {order.serviceName}
        <button disabled={flag.done}>
          <MdCancel
            size={20}
            className={`absolute top-2 left-2 ${
              flag.done ? "opacity-50" : ""
            } `}
            onClick={() => {
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
            }}
          />
        </button>
        <button
          className={`${flag.cancel ? "opacity-50" : ""}`}
          disabled={flag.cancel || order.cancel}
        >
          <MdDone
            size={20}
            className="absolute top-2 right-2"
            onClick={() => {
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
            }}
          />
        </button>
        {flag.isRead && (
          <button
            className="group"
            onClick={() => {
              getUnread();
              handleSetFlagOrder({ type: "unRead", id: order._id });
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
      <div className="relative w-[300px]">
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
        {!flag.isRead && !flag.done && !flag.cancel && (
          <span
            onClick={() => {
              getUnread();
              handleSetFlagOrder({ type: "read", id: order._id });
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
