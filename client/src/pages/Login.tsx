import { useState } from "react";
import { Logo } from "../components";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";
import customAxios from "../utils/authFecth";

interface Props {}
interface InputState {
  email: string;
  password: string;
}
const Login = (props: Props): React.JSX.Element => {
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
      const { data } = await authFect.post("http://localhost:5000/auth/login", {
        email: input.email,
        password: input.password,
      });
      toast.success(data.message);
      setIsLoading(false);
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
        className="mt-[150px] mr-5"
      />
      <form className="-translate-y-[50%]">
        <Logo />
        <div className="mt-5">
          <h1 className="text-center font-semibold text-xl tracking-[2px] ">
            Login
          </h1>
          <div className="mb-3">
            <label htmlFor="">Email</label>
            <div>
              <input
                type="text"
                onChange={handleInputChange}
                value={input.email}
                id="email"
                name="email"
                placeholder="example@email.com"
                className="border border-gray-300 py-1 px-2 min-w-[300px] w-full rounded-sm outline-none"
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
                className="border border-gray-300 py-1 px-2 min-w-[300px] w-full rounded-sm outline-none"
                placeholder="enter your password"
              />
            </div>
          </div>
          <button
            onClick={handleSubmit}
            className="w-full py-2 bg-sky-500 rounded-[sm] mt-3 text-white font-semibold tracking-[2px] hover:opacity-90"
          >
            Submit
          </button>
        </div>
      </form>
    </div>
  );
};
export default Login;
