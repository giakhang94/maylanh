import { useEffect, useState } from "react";
import customAxios from "@/utils/authFecth";
import { toast, ToastContainer } from "react-toastify";
import NumberFormat from "@/utils/FormatNumber";
import { CommonModal } from "@/components";
import PurchaseForm from "./PurchaseForm";
import ClientNavbar from "./ClientNavbar";

interface Props {}

interface StateProps {
  name: string;
  _id: string;
  description: string;
  price: number;
  promotion: boolean;
  promotionPrice: number;
}

const Services = (props: Props): React.JSX.Element => {
  const [isLoading, setIsLoading] = useState(false);
  const [services, setServices] = useState<StateProps[]>([]);
  const [selectedService, setSelectedService] = useState({
    name: "",
    id: "",
    selected: false,
  });

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
  const handleShowModal = (serviceName: string, serviceId: string) => {
    setSelectedService((prev) => ({
      ...prev,
      name: serviceName,
      id: serviceId,
      selected: true,
    }));
  };
  const handleCloseModal = () => {
    // setValues(initialInput);
    setSelectedService({ name: "", id: "", selected: false });
  };

  document.addEventListener("keydown", (e) => {
    // console.log(e.key);
    if (e.key === "Escape") {
      handleCloseModal();
    }
  });
  if (isLoading)
    return (
      <div className="h-screen flex items-center justify-center font-semibold text-2xl tracking-[1px] ">
        loading...
      </div>
    );
  return (
    <div className="mb-20">
      <ClientNavbar />
      <div className="ml-10 text-2xl mb-3 mt-2 block w-fit text-sky-500 ">
        Trang đặt hẹn sửa chữa/vệ sinh
      </div>
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
      {selectedService.selected && (
        <CommonModal handleCloseModal={handleCloseModal}>
          <PurchaseForm
            handleCloseModal={handleCloseModal}
            selectedService={selectedService}
          />
        </CommonModal>
      )}
      <div
        className={`grid Pdesktop:grid-cols-3 Plaptop:grid-cols-3 PbigTablet:grid-cols-2 Ptablet:grid-cols-2 Pmobile:grid-cols-1 Psmallmobile:grid-cols-1 w-full h-full gap-y-10 p-10 relative ${
          selectedService.selected ? "blur-sm" : ""
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
                  handleShowModal(service.name, service._id);
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
    </div>
  );
};

export default Services;
