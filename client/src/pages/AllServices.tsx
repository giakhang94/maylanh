import { useEffect, useState } from "react";
import customAxios from "../utils/authFecth";
import { toast } from "react-toastify";
import NumberFormat from "../utils/FormatNumber";
import { FaRegEdit } from "react-icons/fa";
import { FlexibleInput, PromotionService } from "../components";
import { IoSaveSharp } from "react-icons/io5";
import { MdCancel } from "react-icons/md";

interface Props {}
interface StateProps {
  _id: string;
  name: string;
  description: string;
  image: any;
  price: number;
  promotion: boolean;
  promotionPrice: number;
  thumb?: string;
}
const AllService = (props: Props): React.JSX.Element => {
  const [services, setServices] = useState<StateProps[] | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isEditing, setIsEditing] = useState<{ edit: boolean; id: string }>({
    id: "",
    edit: false,
  });
  const inputInitState = {
    promotion: true,
    promotionPrice: 0,
    name: "",
    description: "",
    price: 0,
  };
  const [input, setInput] = useState<{
    promotion: boolean;
    promotionPrice: number;
    name: string;
    description: string;
    price: number;
  }>(inputInitState);

  const handleCloseEdit = () => {
    setIsEditing({ id: "", edit: false });
  };

  useEffect(() => {
    const getAllService = async () => {
      try {
        setIsLoading(true);
        const { data } = await customAxios().get("/service");
        setServices(data.services);
        setIsLoading(false);
      } catch (error: any) {
        console.log(error);
        error && toast.error(error.data.message);
        setIsLoading(false);
      }
    };
    getAllService();
  }, []);
  if (isLoading) return <div>Loading...</div>;
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    console.log(e.target.name);
    setInput((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };
  console.log(input);
  return (
    <div className="grid grid-flow-col w-full mt-5 mx-5 ">
      {services &&
        services.map((service: StateProps, index: number) => {
          return (
            <div className="max-w-[320px] " key={index + "service-card"}>
              <div className="h-[220px] w-[320px] rounded-md relative">
                <img
                  src={`http://localhost:5000/service/image/${service._id}`}
                  className="h-full object-cover rounded-md w-full"
                  alt=""
                />
                {/* giá khuyến mãi ở đây */}
                <div>
                  <span
                    className=" cursor-pointer absolute z-10 top-0 right-0 py-1 px-2 bg-[#f15a16] text-white font-semibold rounded-md m-2"
                    onClick={() => {
                      setInput((p) => ({
                        ...p,
                        promotion: !service.promotion,
                      }));
                    }}
                  >
                    {isEditing.edit &&
                    isEditing.id === service._id &&
                    !service.promotion
                      ? "Bật giảm giá"
                      : "Tắt giảm giá"}
                  </span>

                  {service.promotion && input.promotion && (
                    <span className="absolute z-10 bottom-0 right-0 py-1 px-2 bg-[#f15a16] text-white font-semibold rounded-md m-2">
                      Giá KM:{" "}
                      {
                        <NumberFormat
                          number={
                            input.promotionPrice || service.promotionPrice!
                          }
                        />
                      }{" "}
                      đ
                    </span>
                  )}
                </div>
              </div>
              <div className="w-full">
                <div className="flex justify-between w-full max-w-[320px]">
                  <p className="w-full  text-lg font-semibold tracking-[1px] flex items-center space-x-2">
                    <FlexibleInput
                      value={input.name}
                      onChange={handleChange}
                      type="text"
                      element="span"
                      isEdit={isEditing}
                      id={service._id}
                      oldValue={service.name}
                      name="name"
                    />
                  </p>

                  <FlexibleInput
                    value={input.price}
                    onChange={handleChange}
                    name="price"
                    element="span"
                    isEdit={isEditing}
                    id={service._id}
                    oldValue={service.price}
                    type="number"
                    classname={`max-w-[100px] w-fit block
                        ${service.promotion ? "line-through opacity-75" : ""}
                      } py-1 px-2 text-[#f15a16] text-lg font-bold rounded-md m-2`}
                  />
                </div>
                <FlexibleInput
                  classname="block w-full break-normal italic text-md text-gray-500"
                  oldValue={service.description}
                  value={input.description}
                  isEdit={isEditing}
                  id={service._id}
                  element="p"
                  type="text"
                  onChange={handleChange}
                  name="description"
                />
                {!isEditing.edit ? (
                  <FaRegEdit
                    size={20}
                    className="text-sky-500 cursor-pointer hover:scale-[120%]"
                    onClick={(e) => {
                      // console.log(e.target.name);

                      setIsEditing((prev) => ({
                        ...prev,
                        id: service._id,
                        edit: true,
                      }));
                      setInput(inputInitState);
                    }}
                  />
                ) : isEditing.id === service._id ? (
                  <div className="flex space-x-3 items-center mt-2">
                    <IoSaveSharp size={20} className="text-green-500" />
                    <MdCancel
                      size={20}
                      className="text-red-500 cursor-pointer"
                      onClick={handleCloseEdit}
                    />
                  </div>
                ) : (
                  <FaRegEdit
                    size={20}
                    className="text-sky-500 cursor-pointer hover:scale-[120%]"
                    onClick={(e) => {
                      // console.log(e.target.name);

                      setIsEditing((prev) => ({
                        ...prev,
                        id: service._id,
                        edit: true,
                      }));
                      // setInput(inputInitState);
                    }}
                  />
                )}
              </div>
            </div>
          );
        })}
    </div>
  );
};

export default AllService;
