import { useEffect, useState } from "react";
import customAxios from "../../utils/authFecth";
import { toast, ToastContainer } from "react-toastify";
import NumberFormat from "../../utils/FormatNumber";
import { PurchaseForm, PurchaseModal } from "../../components";
import submitPurchaseForm from "@/utils/sumitPurchaseForm";

interface Props {}
interface StateProps {
  name: string;
  _id: string;
  description: string;
  price: number;
  promotion: boolean;
  promotionPrice: number;
}
export interface InputType {
  name: string;
  sdt: string;
  address: string;
  note: string;
  service: string;
}
const Services = (props: Props): React.JSX.Element => {
  const initialInput: InputType = {
    sdt: "",
    name: "",
    address: "",
    note: "",
    service: "",
  };
  const [isLoading, setIsLoading] = useState(false);
  const [services, setServices] = useState<StateProps[]>([]);
  const [showModal, setShowModal] = useState(false);
  const [input, setInput] = useState(initialInput);
  useEffect(() => {
    const getService = async () => {
      try {
        setIsLoading(true);
        const { data } = await customAxios().get("/service");
        setServices(data.services);
        setIsLoading(false);
      } catch (error: any) {
        console.log(error);
        toast.error(error.data.message);
        setIsLoading(false);
      }
    };
    getService();
  }, []);
  // console.log(services);
  const handleShowModal = () => {
    setShowModal(true);
  };
  const handleCloseModal = () => {
    setInput(initialInput);
    setShowModal(false);
  };
  const handleChangeForm = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setInput((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  //submit form
  const handleSubmit = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    submitPurchaseForm(input);
  };

  document.addEventListener("keydown", (e) => {
    // console.log(e.key);
    if (e.key === "Escape") {
      handleCloseModal();
    }
  });
  if (isLoading)
    return (
      <div className="h-screen flex items-center, justify-center font-semibold text-2xl tracking-[1px] ">
        loading...
      </div>
    );
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
      {showModal && (
        <PurchaseModal handleCloseModal={handleCloseModal}>
          <PurchaseForm
            handleSubmit={handleSubmit}
            handleChange={handleChangeForm}
            value={input}
            handleCloseModal={handleCloseModal}
          />
        </PurchaseModal>
      )}
      <div
        className={`grid grid-cols-3 w-full space-x-10 p-10 relative ${
          showModal ? "blur-sm" : ""
        }`}
      >
        {services.map((service: StateProps, index: number) => {
          return (
            <div
              className="group w-1/4 max-w-[360px] min-w-[320px] rounded-md shadow-md pb-3 hover:scale-105 transition-all cursor-pointer relative"
              key={index + "service-card-client"}
            >
              <div
                className="absolute hidden z-10 inset-0 bg-[#16edf11b] group-hover:flex justify-center items-center"
                onClick={() => {
                  setInput((prev) => ({ ...prev, service: service.name }));
                  handleShowModal();
                }}
              >
                <span className="cursor-pointer bg-sky-600 text-white text-2xl font-semibold tracking-[1px] py-1 px-3 block rounded-sm -translate-y-[36px]">
                  Đặt lịch
                </span>
              </div>
              <div className="w-full h-[200px] rounded-md relative">
                <img
                  src={`http://localhost:5000/service/image/${service._id}`}
                  //khong xai .toString() cung dc :)
                  className="w-full h-full rounded-tl-md rounded-tr-md"
                  alt="tao"
                />
                {service.promotion && (
                  <>
                    <span className="absolute z-5 bottom-1 right-1 bg-[#f15a16] text-md text-white font-semibold tracking-[1px] rounded-sm py-1 px-2 mr-1">
                      <NumberFormat number={service.promotionPrice} /> đ
                    </span>
                    <span className="absolute z-5 top-1 right-1 bg-[#f15a16] text-md text-white font-semibold tracking-[1px] rounded-sm py-1 px-2 mr-1">
                      Khuyến Mãi
                    </span>
                  </>
                )}
              </div>
              <div className="px-1">
                <div className="flex items-center justify-between">
                  <p className=" tracking-[1px] font-semibold truncate hover:text-clip text-lg ">
                    {service.name}
                  </p>
                  <p
                    className={`text-[#f15a16] font-semibold ${
                      service.promotion ? "line-through opacity-75" : ""
                    }`}
                  >
                    <NumberFormat number={service.price} /> đ
                  </p>
                </div>
                <p className="text-md text-gray-500 italic">
                  {service.description}
                </p>
              </div>
            </div>
          );
        })}
      </div>
    </>
  );
};

export default Services;
