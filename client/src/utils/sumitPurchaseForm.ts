import { InputType as InputPurchaseForm } from "@/types";
import customAxios from "./authFecth";
import { toast } from "react-toastify";
const submitPurchaseForm = async (input: InputPurchaseForm) => {
  try {
    if (!input.sdt) {
      return toast.error("Xin hãy nhập SĐT");
    }
    const regex = /(0[3|5|7|8|9])+([0-9]{8})\b/g;
    if (!input.sdt.match(regex)) {
      return toast.error("xin nhập đúng SĐT");
    }
    if (input.isRegister && !input.password) {
      return toast.error("Bạn chưa điền mật khẩu");
    }
    console.log(input);
    const { data } = await customAxios().post("/order", {
      ...input,
    });
    console.log("resp data", data);
    toast.success(data.message);
    toast.success("info");
  } catch (error: any) {
    console.log(error);
    toast.error(error.data.message);
  }
};
export default submitPurchaseForm;
