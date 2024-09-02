import { toast } from "react-toastify";
import customAxios from "./authFecth";
const handleDeleteService = async (id: string) => {
  try {
    const { data } = await customAxios().delete(`/service/${id}`);
    toast.success(data.message);
  } catch (error: any) {
    console.log(error);
    toast.error(error.data.message);
  }
};

export default handleDeleteService;
