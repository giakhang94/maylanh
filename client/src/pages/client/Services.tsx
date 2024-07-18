import { useEffect, useState } from "react";
import customAxios from "../../utils/authFecth";
import { toast } from "react-toastify";

interface Props {}
interface StateProps {
  name: String;
  _id: string;
  description: String;
  price: number;
  promotion: boolean;
  promotionPrice: number;
}

const Services = (props: Props): React.JSX.Element => {
  const [isLoading, setIsLoading] = useState(false);
  const [services, setServices] = useState<StateProps[]>([]);

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
  console.log(services);
  if (isLoading)
    return (
      <div className="h-screen flex items-center, justify-center font-semibold text-2xl tracking-[1px]">
        loading...
      </div>
    );
  return (
    <div>
      {services.map((service: StateProps, index: number) => {
        return (
          <div className="">
            <div>
              <img
                src={`http://localhost:5000/service/image/${service._id.toString()}`}
                className=""
                alt="tao"
              />
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default Services;
