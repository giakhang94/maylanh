import { useState } from "react";
import { Input } from "../components";

interface Props {}
interface StateType {
  name: string;
  description: string;
  price: number;
  promotion: boolean;
  promotionPrice: number;
  image: Buffer | null;
}
const AddService = (props: Props): React.JSX.Element => {
  const [input, setInput] = useState<StateType>({
    name: "",
    description: "",
    price: 0,
    promotion: false,
    promotionPrice: 0,
    image: null,
  });
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInput((prev) => ({
      ...prev,
      [e.target.name]:
        e.target.name !== "promotion" ? e.target.value : e.target.checked,
    }));
  };
  // console.log(input);
  const handleSubmit = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    e.preventDefault();
    //goi API
  };
  return (
    <form className="flex flex-col  mx-auto w-[350px]">
      <h2 className="mt-5 mb-3 text-center font-bold text-2xl">Thêm Dịch Vụ</h2>

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
      <button
        className="w-full py-2 bg-sky-500 text-white font-semibold tracking-[1px] mt-2 rounde-sm"
        type="submit"
        onClick={handleSubmit}
      >
        Submit
      </button>
    </form>
  );
};

export default AddService;
