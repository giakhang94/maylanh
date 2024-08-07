import { toast } from "react-toastify";
import customAxios from "./authFecth";

interface PropsType {
  type: string;
  id: string;
}
const handleSetFlagOrder = async ({ type, id }: PropsType) => {
  if (type !== "client_cancel") {
    try {
      const { data } = await customAxios().patch(`/order/set-flag/${id}`, {
        type,
      });
      toast.success(data.message);
    } catch (error: any) {
      console.log(error);
      toast.error(error.data.message);
    }
  } else {
    try {
      const { data } = await customAxios().patch(`/order/client-cancel/${id}`, {
        type,
      });
      toast.success(data.message);
    } catch (error: any) {
      toast.error(error.data.message);
    }
  }
};

export default handleSetFlagOrder;
