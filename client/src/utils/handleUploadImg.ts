import { toast } from "react-toastify";
import customAxios from "./authFecth";
import { StateType } from "../pages/dashboard/AddService";
const handleSubmit = async (input: StateType) => {
  const authFetch = customAxios();
  const formData = new FormData();
  formData.append("thumb", input.thumb as File);
  formData.append("input", JSON.stringify(input));
  try {
    const { data } = await authFetch.post("/service/add", formData, {
      headers: { "content-type": "multipart/form-data" },
    });
    data && toast.success(data.message);
    console.log(data);
  } catch (error: any) {
    console.log(error);
    error && toast.error(error.data.message);
  }
};
export default handleSubmit;
