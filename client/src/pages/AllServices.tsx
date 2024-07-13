import { useEffect, useState } from "react";
import customAxios from "../utils/authFecth";
import { toast } from "react-toastify";

interface Props {}
interface StateProps {
  _id?: string;
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
  return (
    <div className="h-40">
      tao
      <img
        src={`http://localhost:5000/service/image/${
          services && services[0]._id?.toString()
        }`}
        alt=""
        className="h-full"
      />
    </div>
  );
};

export default AllService;
