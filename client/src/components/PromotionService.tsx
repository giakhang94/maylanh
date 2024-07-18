import { useState } from "react";
import NumberFormat from "../utils/FormatNumber";

interface Props {
  handleEndPromotion: () => void;
  oldValue?: number;
  input: number;
  handleChange: (e: any) => void;
  name: string;
  promotion: boolean;
  handleChangePromotionPrice: () => void;
}
const PromotionService = ({
  handleEndPromotion,
  oldValue,
  input,
  handleChange,
  handleChangePromotionPrice,
  promotion,
  name,
}: Props) => {
  const [showOptions, setShowOptions] = useState<boolean>(false);
  return (
    <div className="">
      <span
        className=" cursor-pointer absolute z-10 top-0 right-0 py-1 px-2 bg-[#f15a16] text-white font-semibold rounded-md m-2"
        onClick={() => {
          setShowOptions(!showOptions);
        }}
      >
        Đang giảm giá
      </span>
      <span className="absolute z-10 bottom-0 right-0 py-1 px-2 bg-[#f15a16] text-white font-semibold rounded-md m-2">
        Giá KM: {<NumberFormat number={input || oldValue!} />} đ
      </span>
    </div>
  );
};

export default PromotionService;
