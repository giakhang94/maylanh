import { useState } from "react";
import { LoadingForButton, Logo } from "@/components";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";
import customAxios from "@/utils/authFecth";

interface Props {}
interface InputState {
  email: string;
  password: string;
  role: "mod" | "admin";
}

const Register = (props: Props): React.JSX.Element => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const authFetch = customAxios();
  const [input, setInput] = useState<InputState>({
    email: "",
    password: "",
    role: "mod",
  });
  const handleInputChange = (
    e:
      | React.ChangeEvent<HTMLInputElement>
      | React.ChangeEvent<HTMLSelectElement>
  ) => {
    setInput((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    e.preventDefault();
    // console.log(input);
    setIsLoading(true);
    try {
      const resp = await authFetch.post("http://localhost:5000/auth/register", {
        email: input.email,
        password: input.password,
        role: input.role,
      });
      const data = resp.data;
      //data co dang {message:'...', user: {}}
      setIsLoading(false);
      data && toast.success(data.message);
    } catch (error: any) {
      //error must be any type or unknown type
      console.log(error);
      setIsLoading(false);
      toast.error(error.data.message);
    }
  };
  return (
    <div className="flex justify-center items-center h-screen mt-10">
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
            Register
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
          <div className="mb-3">
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
          <div className="flex flex-col mb-2">
            <label htmlFor="role">Role (choose 1 below)</label>
            <select
              name="role"
              id="role"
              className="border-gray-500 border py-1 px-1 rounded-sm text-md block"
              onChange={handleInputChange}
              value={input.role}
            >
              <option className="" value={"admin"}>
                Adminitrastor
              </option>
              <option selected={true} value="mod">
                Moderator
              </option>
            </select>
          </div>
          <button
            onClick={handleSubmit}
            className="w-full py-2 bg-sky-500 rounded-[sm] mt-3 text-white font-semibold tracking-[2px] hover:opacity-90"
          >
            {isLoading ? (
              <div className="flex items-center space-x-2">
                <LoadingForButton classname="" />
                <span>Please wait</span>
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

export default Register;
