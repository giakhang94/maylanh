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
3. bổ sung `user` models cho xong mấy cái phân quyền
4. Bắt đầu tạo models => router => controller cho service
5. Hoàn thiện mấy cái phân quyền

- tạo hàm riêng kiểm tra role của user
- Role được đính kèm vào token khi createJWT.
- Sau đó role dc bắng req.user.role để kiểm tra phân quyền

6. Tạo component input riêng để tránh gõ lại 1 đống <div>

```js
interface Props {
  type: string;
  name: string;
  placeholder?: string;
  value: string | number;
  label: string;
  disabled?: boolean;
  handleInputChange: (e: any) => void;
}

const Input = (props: Props): React.JSX.Element => {
  return (
    <div className="mb-3">
      <label htmlFor="" className="font-semibold tracking-[1px]">
        {props.label}
      </label>
      <div>
        <input
          type={props.type}
          onChange={props.handleInputChange}
          value={props.value}
          id={props.name}
          name={props.name}
          placeholder={props.placeholder}
          className="border border-gray-300 py-1 px-2 min-w-[300px] w-full rounded-md outline-none"
          disabled={props.disabled}
        />
      </div>
    </div>
  );
};

export default Input;
```

7. Tạo page addService, tạo input các kiểu, input type = file để chọn hình ảnh
   7.1. validate file ở react => xài regex e.target.files[0].name.match(/\.(jpg | png | gif)/@) => kiểm tra ext có phải dạng image không?
   7.2. input file onChange có 2 hướng làm:
   -add file vào state của useState
   -hoặc tạo formData = new FomrData() => formData.append('img', file)

   7.3. xử lý gởi data qua BE

### Cần lưu ý 2 chỗ xử lý data này, khi gởi file qua BE

1. BE: Xài multer. Tạo multer config, filter...
   => sau dó dùng làm middleware `router.post('/upload/,auth, multer({...}.single("tênfile")), controller)`
   => ` tênfile` chính là `key` của thằng formdata
   => ví dụ fomr.append("img", flie) => single("img")
   => up file lên local disk thì xài destination. up binary lên cloud thì bỏ destination là được
2. ở FE
   => fetch data headers phải có `content-type: multipart/form-data`
   => khi gởi kèm các field khác. Đã gọi là multipart rồi thì phải chia ra nhiều part
   => mỗi lần chia vậy là append vào hết, lát coi code sẽ rõ.

front-end
(form vàn gửi data qua be)

```js
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.name !== "thumb") {
      setInput((prev) => ({
        ...prev,
        [e.target.name]:
          e.target.name !== "promotion" ? e.target.value : e.target.checked,
      }));
    } else {
      if (!e.target.files) return;
      const isImg = e.target.files[0].name.match(/\.(jpg|jpeg|png|gif)$/); //validate
      if (!isImg) {
        return toast.warning("Please choose a valid image");
      }
      console.log(e.target.files[0]);
      formData.append("thumb", e.target.files[0]); //tạo part đầu tiên key = "thumb", chứa file cần gởi
    }
  };
  // console.log(input);
  const handleSubmit = async (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    e.preventDefault();
    formData.append("input", JSON.stringify(input));// chia part (2 part, input và fileIMG)
    const { data } = await authFetch.post("/service/add", formData, {
      headers: { "content-type": "multipart/form-data" },
    });
    console.log(data);
  };
  return (
    <>

      <form
        className="flex flex-col  mx-auto w-[350px]"
        encType="multipart/form-data"
        method="POST"
        id="form"
      >
        <h2 className="mt-5 mb-3 text-center font-bold text-2xl">
          Thêm Dịch Vụ
        </h2>

        <Input
          handleInputChange={handleInputChange}
          value={input.name}
          type="text"
          placeholder="Nhập tên dịch vụ (sửa máy lạnh...)"
          name="name"
          label="Tên dịch vụ"
        />
        <Input
          handleInputChange={handleInputChange}
          value={input.description}
          type="text"
          placeholder="Nhập mô tả dịch vụ sơ sơ"
          name="description"
          label="Mô tả DV"
        />
        <Input
          handleInputChange={handleInputChange}
          value={input.price}
          type="number"
          placeholder="vd: 100.000"
          name="price"
          label="Giá"
        />

        <div className="flex items-center space-x-3">
          <label htmlFor="">Khuyến mãi</label>
          <input
            type="checkbox"
            checked={input.promotion}
            name="promotion"
            className=""
            onChange={handleInputChange}
          />
        </div>
        <Input
          handleInputChange={handleInputChange}
          value={input.promotionPrice}
          type="number"
          placeholder="Giá khuyến mãi (vd: 20.000)"
          name="promotionPrice"
          label=""
          disabled={!input.promotion}
        />
        {/* upload image */}
        <div className="mb-3">
          <label htmlFor="img">Hình minh họa</label>
          <input type="file" name="thumb" onChange={handleInputChange} />
        </div>
        <button
          className="w-full py-2 bg-sky-500 text-white font-semibold tracking-[1px] mt-2 rounde-sm"
          type="submit"
          onClick={handleSubmit}
        >
          Submit
        </button>
      </form>
    </>
  );
};

export default AddService;

```

### file config multer

```js
import multer from "multer";

import { BadRequestError } from "../errors/index.js";
const MIME_TYPE_MAP = {
  "image/png": "png",
  "image/jpeg": "jpeg",
  "image/jpg": "jpg",
};

const fileUpload = multer({
  limit: 5000000,
  //================khúc cmt ở dưới nếu khôi phục sẽ lưu vào uploads/images
  //================bỏ đi sẽ tạo dạng buffer lưu lên cloud db
  // storage: multer.diskStorage({
  //   // destination: (req, file, cb) => {
  //   //   cb(null, "uploads/images");
  //   // },
  //   filename: (req, file, cb) => {
  //     const ext = MIME_TYPE_MAP[file.mimetype];
  //     cb(null, uuid() + "." + ext);
  //   },
  // }),
  fileFilter: (req, file, cb) => {
    console.log("tao");
    if (!file.originalname.match(/\.(jpg|jpeg|png)$/)) {
      return new BadRequestError("Chỉ upload hình ảnh");
    }
    const isValid = !!MIME_TYPE_MAP[file.mimetype];
    let error = isValid ? null : new Error("invalid mime type");
    cb(error, isValid);
  },
});

export default fileUpload;
```

### Refactor upload imag => sửa lại chõ formData.append()

=> xài useState để set value cho file và input
=> chạy vô hàm handleSubmit tạo formData = new FormData(). Khong tạo ở top level, sẽ bị ghị dồn lại.
=> gom hết vào hàm handleSubmit => append vào formData cả file và input 1 lần 1 trong hàm handleSubmit
=> nếu mà làm rải rác thì mỗi lần bị lỗi, mà nhấn submit lại là nó đồn thêm data và formData

### Display image

1. Đầu tiên get dc service trước. Lấy service.\_id
2. gọi http://localhost:5000/serivce/image/service.\_id
3. qua controller
   3.1. tạo thằng get Image
   - res.set('content-type', 'image/png, image/jpg, image/jpeg')
   - res.send(service.thumb)
     3.2. qua router tạo thêm router
   - router.get('/image/:id) => với id là id của thằng service chứa image cần tải

service/controller.js

```js
const getThumb = async (req, res) => {
  const id = req.params.id;
  const service = await Service.findOne({ _id: id });
  res.set("content-type", "image/png, image/jpg, image/jpeg");
  res.send(service.image);
};
```

getimage như sau:

```js
<div className="h-40">
  tao
  <img
    src={`http://localhost:5000/service/image/${
      services && services[0]._id?.toString() //test tượng trưng coi chạy hay không nên lấy index [0]
      //services fetch api lấy ra all services nên đang ở dạng array chứa các object {}[]
    }`}
    alt=""
    className="h-full"
  />
</div>
```

### Lưu ý về formInputHandler

- thông thường sẽ dùng

```js
  setInput((prev) => [e.target.name]: e.target.value)
  e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  //trường hợp trên là có 2 loại input và text area
  //xảy ra 1 cái nữa là trong textArea thì có value nên k có checked (của checkbox)
  ==> Khi xài checkbox ts sẽ báo lỗi
  ==> sửa như sau
  (e.target as HTMLInputElement).checked //là hết lỗi
```

### create flexible component can switch between input and <p>, <span>

- tips: to display absolute input on the thumbnail
- => must use that input in the root component which contains the rendered thumbnail

```js
import NumberFormat from "../utils/FormatNumber";

interface Props {
  isEdit: { id: string, edit: boolean };
  id: string;
  value: string | number;
  oldValue: string | number;
  element: "span" | "input" | "p";
  type: "text" | "number" | "checkbox";
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  classname?: string;
  name: string;
}

const FlexibleInput = (props: Props): React.JSX.Element => {
  if (props.id === props.isEdit.id) {
    return (
      <div className="p-1 text-gray-500 rounded-md w-fit max-w-[200px]">
        <input
          type={props.type}
          value={props.value || props.oldValue}
          onChange={props.onChange}
          name={props.name}
          className="w-full"
        />
      </div>
    );
  } else {
    const Element = props.element;
    const isPrice = props.name === "price" || props.name === "promotionPrice";
    if (isPrice) {
      return (
        <Element className={props.classname && props.classname + "relative"}>
          {props.id === props.isEdit.id ? (
            <NumberFormat number={props.value} />
          ) : (
            <NumberFormat number={props.oldValue} />
          )}
          <span className="">đ</span>
        </Element>
      );
    }
    return (
      <Element className={props.classname && props.classname}>
        {props.id === props.isEdit.id ? props.value : props.oldValue}{" "}
      </Element>
    );
  }
};

export default FlexibleInput;
```

### Custom hooks

## Form hook

-> create custom-hooks/useForm.ts
in useForm.ts

- create a function accept 1 param : formInput
- in this functiion => call useState hook
- in this function create a handleChange function
  ---- accept e: Event param
  ---- usse handlechange logic for this function (setinput ...)
- create changeInput function for invidually change state like (setInput(initInput))
  ---> return {input, handleChange, changeINput}

## in the root component (needs the hook)

- call {input, handleChange, changInput} = useForm(initInput)

```js
import { InputType } from "@/pages/client/Services";
import { useState } from "react";

const useForm = (formInput: InputType) => {
  const [input, setInput] = useState(formInput);
  const handleChange = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    if (event.target.type === "checkbox") {
      setInput((prev) => ({
        ...prev,
        [event.target.name]: (event.target as HTMLInputElement).checked,
      }));
    } else {
      setInput((prev) => ({
        ...prev,
        [event.target.name]: event.target.value,
      }));
    }
  };
  const changeInput = (input: InputType) => {
    setInput(input);
  };
  return { input, handleChange, changeInput };
};

export default useForm;

```

### validate vietnam phone number format using Regex

```js
const regex = /(0[3|5|7|8|9]) + ([0-9]{8})\b/g; //tao vieets
const regex = /(0[3|5|7|8|9]) + ([0-9]{8})\b/g; //copy
```
