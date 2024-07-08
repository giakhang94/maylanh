import { InitStateProps } from "./appContext";
interface Action {
  type: string;
  payload: any;
}
const reducer = (state: InitStateProps, action: Action) => {
  if (action.type === "GET_CURRENT_USER_SUCCESS") {
    const user = action.payload;
    return { ...state, user: { ...user }, isLoadingUser: false };
  }
  if (action.type === "GET_CURRENT_USER_BEGIN") {
    return { ...state, isLoadingUser: true };
  }
  if (action.type === "GET_CURRENT_USER_ERROR") {
    return { ...state, isLoadingUser: false };
  }
  return state;
  //khởi tạo phải có return, hông thôi bên appContext sẽ báo lỗi chỗ thằng useReducer
};
export default reducer;
