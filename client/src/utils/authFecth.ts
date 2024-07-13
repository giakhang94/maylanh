import axios from "axios";
const customAxios = () => {
  const authFetch = axios.create({
    baseURL: "/",
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
        await axios.get("http://localhost:5000/auth/logout");
      }
      return Promise.reject(error.response);
    }
  );
  return authFetch;
};
export default customAxios;
