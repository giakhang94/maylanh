import { useEffect, useState } from "react";
import customAxios from "@/utils/authFecth";
import { toast, ToastContainer } from "react-toastify";
import NumberFormat from "@/utils/FormatNumber";
import { FaRegEdit } from "react-icons/fa";
import { FlexibleInput } from "@/components";
import { IoSaveSharp } from "react-icons/io5";
import { MdCancel, MdDeleteForever } from "react-icons/md";
import handleDeleteService from "@/utils/deleteService";
import updateServiceObj from "@/utils/updateServiceObj";
import { baseurl } from "@/constants";

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
    _id: "",
    promotionPrice: 0,
    name: "",
    description: "",
    price: 0,
    image: null,
  };
  const [input, setInput] = useState<{
    promotion: boolean;
    _id: string;
    promotionPrice: number;
    name: string;
    description: string;
    price: number;
    image?: File | null;
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
  //2ways-binding
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    console.log(e.target.name);
    setInput((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };
  //submit change service
  const handleSubmit = async (serviceId: string) => {
    try {
      const updatedService = await customAxios().patch(
        `/service/${serviceId}`,
        input,
        { headers: { "content-type": "multipart/form-data" } }
      );
      console.log(updatedService);
      const tempServices = [...services!];
      let thisService = tempServices.find((service) => {
        return service._id === serviceId;
      });
      thisService = updateServiceObj(input, thisService!);

      setServices(tempServices);
      setIsEditing((prev) => ({ ...prev, edit: false, id: "" }));
    } catch (error: any) {
      toast.warning(error.data.message);
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
      <h2 className="text-center font-bold tracking-[2px] text-2xl my-5">
        Danh Sách Dịch Vụ
      </h2>
      <div className="grid Pdesktop:grid-cols-3 gap-y-10 Plaptop:grid-cols-3 Ptablet:grid-cols-2 Pmobile:grid-cols-1 Psmallmobile:grid-cols-1 w-full mt-5 mx-2 pl-3 ml-2 ">
        {services &&
          services.map((service: StateProps, index: number) => {
            return (
              <div
                className="max-w-[320px] Psmallmobile:w-[250px] Pmobile:w-[250px] Ptablet:w-[250px] Plaptop:w-[300px] Pdesktop:w-[320px] min-h-[250px] shadow-sm shadow-gray-300 "
                key={index + "service-card"}
              >
                <div className="h-[220px] w-full rounded-md relative">
                  <img
                    src={`${baseurl(true)}service/image/${service._id}`}
                    className="h-full object-cover rounded-md w-full"
                    alt=""
                  />
                  {/* change thumbnail */}
                  {isEditing.edit && isEditing.id === service._id && (
                    <div className="absolute bg-gray-300 bg-opacity-80 top-2/4 w-[90%] left-2/4 -translate-x-[50%] text-sm p-2 rounded-sm">
                      <label
                        htmlFor="image"
                        className="text-center block font-semibold cursor-pointer"
                      >
                        Đổi hình ảnh
                      </label>
                      <input
                        name="image"
                        id="image"
                        type="file"
                        className=" top-2/4 right-2/4  cursor-pointer hidden"
                        onChange={(e) => {
                          const validate = e.target.files![0].name.match(
                            /\.(jpg|jpeg|png|gif)$/
                          );

                          if (!validate) {
                            toast.error("chỉ úp hình ảnh");
                          } else {
                            setInput((prev) => ({
                              ...prev,
                              image: e.target.files![0],
                            }));
                          }
                        }}
                      />
                    </div>
                  )}
                  {/* giá khuyến mãi ở đây */}
                  <div>
                    {service.promotion && (
                      <span className="absolute top-5 right-0 text-white font-semibold block bg-[#f15a16]  py-1 px-2 rounded-md">
                        Đang giảm giá
                      </span>
                    )}
                    {service.promotion && (
                      <span className="absolute bottom-1 right-1 text-white font-semibold block bg-[#f15a16]  py-1 px-2 rounded-md">
                        <NumberFormat number={service.promotionPrice} /> đ
                      </span>
                    )}
                    {isEditing.edit && isEditing.id === service._id && (
                      <div className="absolute bottom-1 right-1 text-gray-400 font-semibold bg-[#f15a16]  py-1 px-2 rounded-md flex items-center space-x-2">
                        <label htmlFor="">nhập giá KM</label>
                        <input
                          value={input.promotionPrice || service.promotionPrice}
                          name="promotionPrice"
                          onChange={handleChange}
                          className="w-fit max-w-[85px] mr-2 inline-block"
                        />
                      </div>
                    )}
                  </div>
                  {/* xong phần khuyến mãi */}
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
                    classname="block w-full break-normal italic text-md text-gray-500 truncate hover:text-wrap"
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
                    <div className="flex justify-between items-center self-end">
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
                      <MdDeleteForever
                        size={25}
                        className="text-red-500 cursor-pointer hover:scale-[120%]"
                        onClick={() => {
                          handleDeleteService(service._id);
                        }}
                      />
                    </div>
                  ) : isEditing.id === service._id ? (
                    <div className="flex space-x-3 items-center mt-2">
                      <IoSaveSharp
                        size={20}
                        className="text-green-500 cursor-pointer hover:scale-[120%]"
                        onClick={() => {
                          handleSubmit(service._id);
                        }}
                      />
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
    </>
  );
};

export default AllService;
