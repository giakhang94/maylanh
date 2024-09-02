import { baseurl } from "@/constants";
import axios from "axios";
const customAxios = () => {
  const authFetch = axios.create({
    baseURL: baseurl(false), //true: development, false: production
    withCredentials: true,
    headers: {
      // Authorization: `Bearer ${token}`,
      "content-type": "application/json",
    },
  });
  authFetch.interceptors.response.use(
    (response) => {
      return response;
    },
    async (error) => {
      console.log("interceptoer", error);
      if (error.response.data.statusCode === 401) {
        console.log("Auth error");
        await axios.get("https://maylanh.onrender.com/auth/logout");
      }
      return Promise.reject(error.response);
    }
  );
  return authFetch;
};
export default customAxios;
