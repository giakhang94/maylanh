import { useState } from "react";
import { Input } from "@/components";
import { ToastContainer, toast } from "react-toastify";
import handleSubmit from "@/utils/handleUploadImg";

interface Props {}
export interface StateType {
  name: string;
  description: string;
  price: number;
  promotion: boolean;
  promotionPrice: number;
  thumb?: File | null;
  color: string;
}
const AddService = (props: Props): React.JSX.Element => {
  const [input, setInput] = useState<StateType>({
    name: "",
    description: "",
    price: 0,
    promotion: false,
    promotionPrice: 0,
    thumb: null,
    color: "#FBB731",
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.name !== "thumb") {
      setInput((prev) => ({
        ...prev,
        [e.target.name]:
          e.target.name !== "promotion" ? e.target.value : e.target.checked,
      }));
    } else {
      if (!e.target.files) return;
      if (!e.target.files[0].name.match(/\.(jpg|jpeg|png|gif)$/)) {
        return toast.warning("Please choose a valid image");
      }
      console.log(e.target.files[0]);
      const file = e.target.files[0];
      setInput((prv) => ({ ...prv, thumb: file }));
    }
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
      <form
        className="flex flex-col  mx-auto Psmallmobile:w-[250px] Pmobile:w-[300px] Plaptop:w-[300px] Ptablet:[w-350px] Pdesktop:w-[350px]]"
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
        <div className="flex justify-between items-center">
          <Input
            handleInputChange={handleInputChange}
            value={input.price}
            type="number"
            placeholder="vd: 100.000"
            name="price"
            label="Giá"
          />
          <div className="w-2/4 ml-5">
            <label htmlFor="color">Màu hiển thị</label>
            <input
              className="w-[90%] border-none outline-none rounded-md cursor-pointer"
              id="color"
              name="color"
              type="color"
              value={input.color}
              onChange={(e) => {
                setInput((prev) => ({ ...prev, color: e.target.value }));
              }}
            />
          </div>
        </div>

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
        <div className="mb-3 w-fll">
          <label htmlFor="img">Hình minh họa</label>
          <input
            type="file"
            name="thumb"
            onChange={handleInputChange}
            className="w-full"
          />
        </div>
        <button
          className="w-full py-2 bg-sky-500 text-white font-semibold tracking-[1px] mt-2 rounded-sm"
          type="submit"
          onClick={(e) => {
            e.preventDefault();
            handleSubmit(input);
          }}
        >
          Submit
        </button>
      </form>
    </>
  );
};

export default AddService;
