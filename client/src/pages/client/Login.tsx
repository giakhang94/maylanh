import { useState } from "react";
import { LoadingForButton, Logo } from "@/components";
import { toast, ToastContainer } from "react-toastify";
import customAxios from "@/utils/authFecth";
import { useNavigate } from "react-router-dom";
import { useAppContext } from "@/Context/appContext";

interface Props {}
interface InputState {
  email: string;
  password: string;
}
const Login = (props: Props): React.JSX.Element => {
  const nav = useNavigate();
  const { getCurrentUser } = useAppContext();
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [input, setInput] = useState<InputState>({ email: "", password: "" });
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInput((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      const authFect = customAxios();
      const { data } = await authFect.post("/auth/login", {
        email: input.email,
        password: input.password,
      });
      toast.success(data.message + ", redirecting to dashboard...");
      // toast.info("Redirecting to dashboard...");
      setIsLoading(false);
      setTimeout(() => {
        getCurrentUser();
        nav("/admin");
      }, 3000);
    } catch (error: any) {
      console.log(error.data);
      console.log(error.data.message);
      toast.error(error.data.message);
      setIsLoading(false);
    }
  };

  return (
    <div className="flex justify-center items-center h-screen">
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="colored"
        className="mt-[150px] mr-5 text-xl"
      />
      <form className="-translate-y-[50%] Psmallmobile:w-[250px] Pmobile:w-[300px] Plaptop:w-[300px] Ptablet:[w-350px] Pdesktop:w-[350px]">
        <Logo />
        <div className="mt-5 w-full">
          <h1 className="text-center font-semibold text-xl tracking-[2px] ">
            Login
          </h1>
          <p className="text-sm">demo user: ngk.khang94@gmail.com </p>
          <p className="text-sm">demo password: 123456abc</p>
          <div className="mb-3">
            <label htmlFor="">Email</label>
            <div>
              <input
                type="text"
                onChange={handleInputChange}
                value={input.email}
                id="email"
                name="email"
                placeholder="demo email: ngk.khang94@email.com"
                className="border border-gray-300 py-1 px-2  w-full rounded-sm outline-none"
              />
            </div>
          </div>
          <div>
            <label htmlFor="password">Password</label>
            <div>
              <input
                type="password"
                id="password"
                onChange={handleInputChange}
                value={input.password}
                name="password"
                className="border border-gray-300 py-1 px-2 w-full rounded-sm outline-none"
                placeholder="demo pw: 123456abc"
              />
            </div>
          </div>
          <button
            onClick={handleSubmit}
            disabled={isLoading}
            className="w-full h-full py-2 block  bg-sky-500 rounded-[sm] mt-3 text-white font-semibold tracking-[2px] hover:opacity-90"
          >
            {isLoading ? (
              <div className="flex items-center justify-center space-x-2">
                <LoadingForButton classname="" />
                <span className="block text-white tracking-[2px]">
                  Please wait
                </span>
              </div>
            ) : (
              "Submit"
            )}
          </button>
        </div>
      </form>
    </div>
  );
};
export default Login;
