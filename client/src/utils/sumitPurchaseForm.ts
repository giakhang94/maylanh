import { InputType as InputPurchaseForm } from "@/types";
import customAxios from "./authFecth";
import { toast } from "react-toastify";
const submitPurchaseForm = async (input: InputPurchaseForm) => {
  try {
    // const { data } = await customAxios().post("/service/purchase", {
    // //   ...input,
    // // });
    // console.log(data);
    // toast.success(data.message);
    if (!input.sdt) {
      return toast.error("Xin hãy nhập SĐT");
    }
    const regex = /(0[3|5|7|8|9])+([0-9]{8})\b/g;
    if (!input.sdt.match(regex)) {
      return toast.error("xin nhập đúng SĐT");
    }

    console.log(input);
    toast.success("info");
  } catch (error: any) {
    console.log(error);
    toast.error(error.data.message);
  }
};
export default submitPurchaseForm;
