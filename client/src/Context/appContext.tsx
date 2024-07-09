import { createContext, useContext, useEffect, useReducer } from "react";
import reducer from "./reducer";
import customAxios from "../utils/authFecth";
import { useNavigate } from "react-router-dom";
export interface InitStateProps {
  user: any;
  cart: {};
  isLoadingUser: boolean;
  getCurrentUser: () => void;
  logout: () => void;
}
const initState: InitStateProps = {
  user: null,
  cart: {},
  isLoadingUser: true,
  getCurrentUser() {},
  logout() {},
};
const AppContext = createContext(initState);
const AppProvider = ({ children }: any): React.JSX.Element => {
  const [state, dispatch] = useReducer(reducer, initState);
  const authFecth = customAxios();

  const logout = async () => {
    await authFecth.get("/auth/logout");
  };
  const getCurrentUser = async () => {
    dispatch({ type: "GET_CURRENT_USER_BEGIN", payload: {} });
    try {
      const { data } = await authFecth.get("auth/get-current-user");

      dispatch({
        type: "GET_CURRENT_USER_SUCCESS",
        payload: data.user,
      });
    } catch (error) {
      dispatch({ type: "GET_CURRENT_USER_ERROR", payload: {} });
    }
  };

  useEffect(() => {
    getCurrentUser();
  }, []);
  return (
    <AppContext.Provider value={{ ...state, getCurrentUser, logout }}>
      {children}
    </AppContext.Provider>
  );
};
const useAppContext = () => {
  return useContext(AppContext);
};
export { AppProvider, useAppContext };
