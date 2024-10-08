import { MdClose } from "react-icons/md";
import Input from "@/components/Input";
import Logo from "@/components/Logo";
import { InputType } from "@/types";
import useForm from "@/hooks/useForm";
import submitPurchaseForm from "@/utils/sumitPurchaseForm";

interface Props {
  handleCloseModal: () => void;
  selectedService: { name: string; id: string };
}
const PurchaseForm = ({
  handleCloseModal,
  selectedService,
}: Props): React.JSX.Element => {
  const initialInput: InputType = {
    phone: "",
    name: "",
    address: "",
    note: "",
    service: "",
    isRegister: false,
    password: "",
  };
  const { input, handleChange } = useForm(initialInput);
  //submit form
  const handleSubmit = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    submitPurchaseForm(input, selectedService.id, selectedService.name);
  };
  return (
    <form
      className=" flex flex-col justify-center w-[350px] mx-auto my-10 bg-white px-5 py-10 rounded-md shadow-md text-md relative transition-all MERN/maylanh/client/src/pages/client/Login.tsx"
      id="purchase-form"
    >
      <MdClose
        size={25}
        className="absolute top-2 right-2 cursor-pointer  hover:text-sky-500 transition-all block"
        onClick={handleCloseModal}
      />
      <Logo />
      <h2 className="pb-1 text-center font-semibold">Điền thông tin đặt hẹn</h2>
      <span className="pb-3 text-lg text-center italic text-[#f15a16] font-bold">
        Dịch vụ: {selectedService.name}
      </span>
      <Input
        name="phone"
        type="text"
        handleInputChange={handleChange}
        placeholder="vd: 0903282828"
        value={input.phone}
        label="Số điện thoại"
        classname="text-black"
      />
      <Input
        name="name"
        type="text"
        handleInputChange={handleChange}
        placeholder="vd: Anh Tân Q12"
        value={input.name}
        label="Tên liên lạc"
        classname="text-black"
      />
      <Input
        name="address"
        type="text"
        handleInputChange={handleChange}
        placeholder="Địa chỉ cần vệ sinh/sửa chữa"
        value={input.address}
        label="Địa chỉ"
        classname="text-black"
      />
      <div>
        <label className="font-semibold tracking-[1px]" htmlFor="note">
          Lưu ý nếu có
        </label>
        <textarea
          className="block border border-gray-300 w-full rounded-sm"
          placeholder="Mô tả tình trạng nếu có"
          name="note"
          onChange={handleChange}
          value={input.note}
          id=""
        ></textarea>
      </div>
      <div className="flex items-center space-x-3 my-3">
        <input
          type="checkbox"
          checked={input.isRegister}
          onChange={handleChange}
          name="isRegister"
        />
        <label>
          <span className="block">mở tài khoản bằng SDT ở trên</span>
          <span className="italic -mt-1 block">
            Để có thể xem lại, thay đổi, hủy hẹn
          </span>
        </label>
      </div>
      {input.isRegister && (
        <Input
          name="password"
          type="password"
          handleInputChange={handleChange}
          placeholder="Nhập mật khẩu cho tài khoản"
          value={input.password}
          label="Mật khẩu"
          classname="text-black"
        />
      )}
      <button
        className="mt-5  rounded-sm py-1 px-2 w-full bg-sky-500 text-white font-semibold tracking-[1px]"
        onClick={handleSubmit}
      >
        Đặt hẹn
      </button>
    </form>
  );
};

export default PurchaseForm;
