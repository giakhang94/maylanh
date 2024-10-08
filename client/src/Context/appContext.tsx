import { createContext, useContext, useEffect, useReducer } from "react";
import reducer from "./reducer";
import customAxios from "../utils/authFecth";

export interface InitStateProps {
  user: any;
  cart: {};
  client: any;
  isLoadingUser: boolean;
  isLoadingClient: boolean;
  isLoadingService: boolean;
  getCurrentUser: () => void;
  logout: () => void;
  getCurrentClient: () => void;
  logoutClient: () => void;
  isChangeRead: boolean;
  getUnread: () => void;
  unRead: () => void;
  read: () => void;
  unread: number;
  services: any;
}
const initState: InitStateProps = {
  user: null,
  client: null,
  cart: {},
  isLoadingClient: true,
  isLoadingUser: true,
  isLoadingService: true,
  getCurrentUser() {},
  read() {},
  unRead() {},
  logout() {},
  getCurrentClient() {},
  logoutClient() {},
  isChangeRead: false,
  getUnread() {},
  unread: 0,
  services: null,
};
const AppContext = createContext(initState);
const AppProvider = ({ children }: any): React.JSX.Element => {
  const [state, dispatch] = useReducer(reducer, initState);
  const authFetch = customAxios();

  const logout = async () => {
    await authFetch.get("/auth/logout");
  };

  const logoutClient = async () => {
    await authFetch.get("/client/logout");
  };

  const getCurrentUser = async () => {
    dispatch({ type: "GET_CURRENT_USER_BEGIN", payload: {} });
    try {
      const { data } = await authFetch.get("auth/get-current-user");

      dispatch({
        type: "GET_CURRENT_USER_SUCCESS",
        payload: data.user,
      });
    } catch (error) {
      dispatch({ type: "GET_CURRENT_USER_ERROR", payload: {} });
    }
  };

  const getCurrentClient = async () => {
    dispatch({ type: "GET_CURRENT_CLIENT_BEGIN", payload: {} });
    try {
      const { data } = await authFetch.get("/client/get-current");

      dispatch({
        type: "GET_CURRENT_CLIENT_SUCCESS",
        payload: data.currentClient,
      });
    } catch (error) {
      dispatch({ type: "GET_CURRENT_CLIENT_ERROR", payload: {} });
    }
  };
  const getUnread = async () => {
    try {
      const { data } = await authFetch.get("/order/unread");
      dispatch({ type: "GET_UNREAD", payload: { unread: data.unread } });
    } catch (error) {
      console.log(error);
    }
  };
  const read = () => {
    dispatch({ type: "READ", payload: {} });
  };
  const unRead = () => {
    dispatch({ type: "UNREAD", payload: {} });
  };
  const getAllServices = async () => {
    dispatch({ type: "GET_SERVICES_BEGIN", payload: {} });
    try {
      const { data } = await authFetch.get("/service");
      dispatch({ type: "GET_SERVICES_DONE", payload: data.services });
    } catch (err) {
      console.log(err);
      dispatch({ type: "GET_SERVICES_ERROR", payload: {} });
    }
  };

  useEffect(() => {
    getCurrentUser();
    getCurrentClient();
  }, []);

  return (
    <AppContext.Provider
      value={{
        ...state,
        getCurrentUser,
        logout,
        getCurrentClient,
        logoutClient,
        read,
        unRead,
        getUnread,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};
const useAppContext = () => {
  return useContext(AppContext);
};
export { AppProvider, useAppContext };
