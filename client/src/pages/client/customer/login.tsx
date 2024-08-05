import { Logo } from "@/components";
import submitCustomerLogin from "@/utils/submitCustomerLogin";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ToastContainer } from "react-toastify";

interface Props {}

const CustomerLogin = (props: Props): React.JSX.Element => {
  const navigate = useNavigate();
  const [input, setInput] = useState({ phone: "", password: "" });
  const handleChangeInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInput((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  return (
    <>
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
      <form className="flex flex-col mx-auto max-w-[300px] space-y-5 my-5">
        <Logo size="xl" />
        <div>
          <label htmlFor="phone">SĐT</label>
          <input
            name="phone"
            type="text"
            value={input.phone}
            onChange={handleChangeInput}
            placeholder="Sđt mà bạn dùng đặt hẹn"
            className="block border border-gray-300 p-1 rounded-sm w-full"
          />
        </div>
        <div>
          <label htmlFor="password">Mật khẩu</label>
          <input
            value={input.password}
            onChange={handleChangeInput}
            name="password"
            type="password"
            className="block w-full border border-gray-300 p-1 rounded-sm"
          />
        </div>
        <button
          className="w-full bg-sky-500 text-white font-semibold tracking-[1px] text-sm py-2 rounded-sm"
          type="submit"
          onClick={async (e) => {
            e.preventDefault();
            const result = await submitCustomerLogin(input);
            result &&
              setTimeout(() => {
                navigate("/customer/order");
              }, 3000);
          }}
        >
          Đăng nhập
        </button>
      </form>
    </>
  );
};

export default CustomerLogin;
