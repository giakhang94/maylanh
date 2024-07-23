import { MdClose } from "react-icons/md";
import Input from "./Input";
import Logo from "./Logo";
interface InputType {
  name: string;
  sdt: string;
  address: string;
  note?: string;
  service: string;
}
interface Props {
  handleChange: (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => void;
  value: InputType;
  handleCloseModal: () => void;
  handleSubmit: (e: React.MouseEvent<HTMLButtonElement>) => void;
}
const PurchaseForm = ({
  handleSubmit,
  handleChange,
  value,
  handleCloseModal,
}: Props): React.JSX.Element => {
  return (
    <form
      className=" flex flex-col justify-center w-[350px] mx-auto mt-10 bg-white px-5 py-10 rounded-md shadow-md text-md relative"
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
        Dịch vụ: {value.service}
      </span>
      <Input
        name="sdt"
        type="text"
        handleInputChange={handleChange}
        placeholder="vd: 0903282828"
        value={value.sdt}
        label="Số điện thoại"
        classname="text-black"
      />
      <Input
        name="name"
        type="text"
        handleInputChange={handleChange}
        placeholder="vd: Anh Tân Q12"
        value={value.name}
        label="Tên liên lạc"
        classname="text-black"
      />
      <Input
        name="address"
        type="text"
        handleInputChange={handleChange}
        placeholder="Địa chỉ cần vệ sinh/sửa chữa"
        value={value.address}
        label="Số điện thoại"
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
          value={value.note}
          id=""
        ></textarea>
      </div>
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
