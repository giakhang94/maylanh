1. npx create-react-app -tênapp --template typescript
2. npm install tailwindcss, configure (search docs)
   2.1. install react router dom, axios
3. create folders: components, pages
4. add file to pages to create Router
5. create function components using this template

```js
interface Props {}

const Login = (props: Props): React.JSX.Element => {
  return <></>;
};
export default Login;
```

6. Create router for app (client)
   6.1. import BrowserRouter, Routes, Route from react-router-dom
   6.2. create 2 components: Sidebar and Navbar
   sidebar contains pages in admin page and page's logo
   navbar contains user info

   ```js
   const ShareLayout = (props: Props): React.JSX.Element => {
     return (
       <>
         <div className="flex w-full">
           <BigSidebar />
           <div className="flex-1 bg-gray-100 ">
             <Navbar />
             <div>
               <Outlet />
             </div>
           </div>
         </div>
       </>
     );
   };
   export default ShareLayout;
   ```

7. in App.tsx

```js
import "./App.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Dashboard, Login, Order, ShareLayout } from "./pages";
function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<ShareLayout />} path="/admin">
          <Route element={<Dashboard />} index />
          <Route element={<Login />} path="/admin/login" />
          <Route element={<Order />} path="/admin/order" />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
```

8. Finsh login page and register page
   8.1. Use axios fetch in this login/register paage, dont need to use global context

============
Qua NODE JS

9. npm init -y
   9.1. install packages: express, nodemon, mongoose, bcrypt, jwt, axios
   9.2. Moogose and mongo db
   9.3. creaate server and connect DB
10. create needed folders and files: server.js, controllers, model, routers, db (database)/connectDb.js
    10.1. create env file which contains mongodb_uri, jwt and token confiuguration
    10.2. install dotenv
11. Connect to mongoDB to create server in serverside (server.js)
12. create API for register and login user
    12.1. install axios for server side, install validator for serverside
    12.1. in root/models create userModel.js
    12.3. install express-aync-error => dont need to use try-catch block anymore.
    use `throw new Error('text') instead of next(error) `
    12.4. create error handler in serverside
    - create customError extends Error (super message, add statusCode)
    - create NotFoundError, UnAuthenticatioError,...

```js
import CustomError from "./CustomError.js";

class BadRequestError extends CustomError {
  constructor(message) {
    super(message);
    this.statusCode = 400;
  }
}
export default BadRequestError;
```

12.5. tạo middlewares/ErrorHandlerMiddleware.js
Lưu ý: Error handler Middleware, cái message với status code khi mình console.log(error)
sẽ ra một đống tùm lum. phải log đích danh để lấy xài, nó không gọn, không
xài d như 1 object thông thường được
=> error.statusCode, error.message thì được

### Error handler

1. dùng (error, req, res, next) => {} để bắt error.
2. Nếu là validate (để bên user thì xài error.name => lấy name của lỗi là "Validation", error.name = "Error" by default)
3. Nếu là lỗi unique => sẽ có error.code = 11000
4. Nếu là những lỗi khác bắt ở controller thì throw qua error. Bắt error.message

```js
const ErrorHandlerMiddleware = (error, req, res, next) => {
  console.log("tao nef may ", error.name);
  const defaultError = {
    statusCode: error.statusCode || 500,
    message: error.message || "something went wrong",
  };
  //validate thì lần này dùng riêng bên controller rồi.
  //missed field cũng dùng bên controller
  //lỗi trùng email (unique email)
  if (error.code && error.code === 11000) {
    defaultError.statusCode = 400;
    defaultError.message = "email has been already used";
  }
  res.status(defaultError.statusCode).json({
    error: {
      statusCode: defaultError.statusCode,
      message: defaultError.message,
    },
  });
};

export default ErrorHandlerMiddleware;
```

### Xong quay qua Client (ReactJS) làm phần đẩy post data qua server, loading,..

13. install toastify to display alert

### Login controller

14. install jwt (jsonwebtoken) and bcrypt
    14.1. create schema methods: user.comparePassword
    14.2. create method user.createJWT
    use `this._id` instead of `this.id`
    `this._id` return an ObjectId('....')
    `this.id` return a string id (66b293923403523...)
    ### logic login như bình thường
    -> kiểm tra email, password. Kiếm user by email, nếu có thì tiếp, không có thì báo lỗi.
    -> nếu có user by email thì so sanh password
    -> password match thì tạo token bằng jwt. payload:` {userID: this._id}`

### >>>>>>>> LUU Y: Add app.use(cookieParser()) into to server.js<<<<<<<<

```js
UserSchema.methods.comparePassword = async function (clientPass) {
  const isMatched = await bcrypt.compare(clientPass, this.password);
  return isMatched;
};

UserSchema.methods.createJWT = function () {
  console.log(this._id);
  const token = jwt.sign({ userId: this.id });
  return 1;
};
```

### create cookie useing jwt token

15. create utils/attachCookie.js

```js
const attachCookie = (res, token) => {
  const oneDay = 1000 * 60 * 60 * 24;
  res.cookie("token", token, {
    expiresIn: Date(Date.now() + oneDay),
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
  });
};

export default attachCookie;
```

### Luư ý khi cookie được gửi theo response mà không có trên browser.

=> Thêm withCredential: true vào config của axios.
=> Tạo hàm customAxios return 1 cái axios mình đã custom và thêm interceptor vào.
=> Tham số token sẽ get ở từng chỗ cần thiết rồi bỏ vào, không cần get global (hoặc global cũng dc)

```js
import axios from "axios";
const customAxios = (token: string) => {
  const authFetch = axios.create({
    baseURL: "/",
    withCredentials: true,
    headers: {
      Authorization: `Bearer ${token}`,
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
```

16. in usercontroller.js

```js
attachCookie(res, token);
```

### create logout API before creating get current user

### Flow login and get current user

- khi login xong, cookie được đưa lên res
- sau đó khi load các trang cần curent user => lấy cookie đó, đối chiếu với thông tin đăng nhập
- Sau đó đưa thông tin đăng nhập vô req. Để xử lý các tác vụ khác
- Sẽ viết 1 cá middleware kiểm tra. Nếu có token thì add vô request, nếu không có thì force to log out

### auth middleware - check authentication - check if a user logged in or not

- get token from req.cookies.token
- decode by using jwt.verify(token, secretString) => return an Object {userId: ...}
- find user by id userId

```js
import { UnAuthorizationError } from "../errors/index.js";
import jwt from "jsonwebtoken";
const auth = (req, res, next) => {
  const token = req.cookies.token;
  if (!token) {
    throw new UnAuthorizationError("Please login to continue");
  }
  try {
    const payload = jwt.verify(token, process.env.JWT_SECRET);
    req.user = payload;
    next();
  } catch (error) {
    throw new UnAuthorizationError("Unauthenticated, login to continue");
  }
};
export default auth;
```

### Context API

1. Tạo context bằng createContext. VD const AppContext = createContext(initState). TS bắt phải có tham số
2. Tạo Provider là 1 Component, return <AppContext.Provider>
3. Trong cái Provider này sẽ tạo thêm các function cần thiết

- [state, dispatch] = useReducer(reducer, initstate)
- các hàm như logout, getCurrentUser, cái nào cần thiết thì thêm vào

4. Lưu ý cái GET CURRENT USER, vì nó load từ server nên lâu.
   => Phải thêm isLoading user vào global luôn.
   => xài bộ ba begin/success/error
5. Cái nào cần thay đổi tác động state, thì dispatch nó để qua reducer xử lý.

### Get current user

1. Tạo 1 cái useEffect ở Provider
2. useEffect này gọi thằng GetCurrentUser, để update prop user cho state.
3. Có cái user này rồi thì mấy page khác mới thực hiện auth được

```js
import { createContext, useContext, useEffect, useReducer } from "react";
import reducer from "./reducer";
import customAxios from "../utils/authFecth";
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
export { AppProvider, useAppContext };`
```

### Tạo component ProtectedLayout (hoặc ProtectedRouter)

1. là cái router nhận {children} làm prop
2. nhận 2 biến global là user và isloadingUser
3. Nếu isLoadingUser === true => đang get current user
   => khoan hả render gì hết => return <Loading/>
4. Nếu isLoadingUser === false => load ok hoặc fail rồi thì kiểm tra user (currentusser)
5. nếu !user => naviage về homepage
6. Nếu có user thì return `children`

```js
import { useAppContext } from "../Context/appContext";
import { Navigate } from "react-router-dom";
interface Props {}

const ProtectedLayout = ({ children }: any) => {
  const { user, isLoadingUser } = useAppContext();
  console.log(isLoadingUser);
  if (isLoadingUser) return <>loading...</>;
  // loading này có thể mốt đổi thành 1 component <Loading />
  if (!user) {
    return <Navigate to="/" />;
  }
  return children;
};
export default ProtectedLayout;
```

### Lưu ý về login

1. Login xong thì phải `getCurrentUser()` lại 1 cái
   => để biến global `user` nó update
   => mới xuyên qua thằng <ProtectedRouter/> được
   => dùng useNavigate để navigate nó về dashboar
2. Sau khi logout thì chỉ cần navigate nó về home là dc
   => cũng dùng useNavigate luôn

### xong rồi nhảy qua làm CRUD

các bước chuẩn bị

1. hoàn thiện cái sidebar trước

- dùng NavLink để bao các sidebar item lại (dễ xài active)
- Root router bị always active => bỏ prop end vô tất cả cá prop là ok
- Tạo riêng component sidebar item như bên dưới, để qua sidebar render cho dễ

```js
import { IconType } from "react-icons";
import { NavLink } from "react-router-dom";

interface Props {
  icon: IconType;
  title: string;
  path: string;
}

const BigSidebarItem = (props: Props) => {
  const Icon = props.icon;
  return (
    <NavLink
      end
      to={`${props.path}`}
      className={({ isActive, isPending, isTransitioning }) =>
        [
          isPending ? "pending" : "",
          isActive ? "active" : "",
          isTransitioning ? "transitioning" : "",
          "flex justify-center items-center space-x-5",
        ].join(" ")
      }
    >
      <Icon size={25} />
      <span className="">{props.title}</span>
    </NavLink>
  );
};

export default BigSidebarItem;
```

2. Tạo thêm các page cần thiết như Add-service, all-services...
3. Bắt đầu tạo models => router => controller cho service
