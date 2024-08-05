import { toast } from "react-toastify";
import customAxios from "./authFecth";

interface Input {
  phone: string;
  password: string;
}
const submitCustomerLogin = async (input: Input) => {
  let { phone } = input;
  const { password } = input;
  if (!phone || !password) {
    return toast.error("Bần cần nhập đầy đủ thông tin nè");
  }
  const regex = /([0|+84][|3|5|7|8|9])+([0-9]{8})\b/g;
  if (!phone.match(regex)) {
    return toast.warning("hãy nhập đúng định dạng sdt");
  }
  if (phone.includes("+84")) {
    phone = phone.replace("+84", "0");
  }
  try {
    const { data } = await customAxios().post("/client/login", { ...input });
    toast.success(data.message);
    return true;
  } catch (error: any) {
    toast.error(error.data.message);
    return false;
  }
};
export default submitCustomerLogin;
