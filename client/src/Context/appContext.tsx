import { createContext, useContext, useEffect, useReducer } from "react";
import reducer from "./reducer";
import customAxios from "../utils/authFecth";
import { useNavigate } from "react-router-dom";
export interface InitStateProps {
  user: any;
  cart: {};
  client: any;
  isLoadingUser: boolean;
  isLoadingClient: boolean;
  getCurrentUser: () => void;
  logout: () => void;
  getCurrentClient: () => void;
}
const initState: InitStateProps = {
  user: null,
  client: null,
  cart: {},
  isLoadingClient: true,
  isLoadingUser: true,
  getCurrentUser() {},
  logout() {},
  getCurrentClient() {},
};
const AppContext = createContext(initState);
const AppProvider = ({ children }: any): React.JSX.Element => {
  const [state, dispatch] = useReducer(reducer, initState);
  const authFetch = customAxios();

  const logout = async () => {
    await authFetch.get("/auth/logout");
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

  useEffect(() => {
    getCurrentUser();
    getCurrentClient();
  }, []);
  return (
    <AppContext.Provider
      value={{ ...state, getCurrentUser, logout, getCurrentClient }}
    >
      {children}
    </AppContext.Provider>
  );
};
const useAppContext = () => {
  return useContext(AppContext);
};
export { AppProvider, useAppContext };
