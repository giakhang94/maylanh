import { useEffect, useState } from "react";
import LineChart2 from "./Component/LineChart";
import PieCancel from "./Component/pieCancel";
import StatsPie from "./Component/PieChart";
import customAxios from "@/utils/authFecth";
import { Loading } from "@/components";

interface Props {}

const Stats = () => {
  const [data, setData] = useState<any>();
  const [isLoading, setisLoading] = useState(true);
  useEffect(() => {
    const getData = async () => {
      try {
        const { data } = await customAxios().get("/order/stats");
        setData(data);
        setisLoading(false);
      } catch (error) {
        console.log(error);
      }
    };
    getData();
  }, []);
  if (isLoading)
    return (
      <div>
        <Loading classname="" />
      </div>
    );
  return (
    <div className="w-full">
      <p className="font-semibold tracking-[1px] pt-5 px-5 text-center flex justify-center text-sky-500 Ptablet:text-xl PbigTablet:text-2xl Psmallmobile:text-lg Pmobile:text-lg Plaptop:text-2xl Pdesktop:text-2xl text-wrap">
        Thống kê cho có vẻ nguy hiểm chứ éo coi tới
      </p>
      <div className="flex Plaptop:flex-row Pdesktop:flex-row PbigTablet:flex-row Ptablet:flex-row Pmobile:flex-col Psmallmobile:flex-col w-full justify-center items-center mb-10">
        <div>
          <StatsPie data={data.statsPie} isLoading={isLoading} />
        </div>
        <div>
          <PieCancel data={data.pieCancel} isLoading={isLoading} />
        </div>
      </div>
      <div className="Plaptop:w-full Pdesktop:w-ful PbigTablet:w-full Ptablet:w-full Pmobile:w-[450px] Psmallmobile:w-[450px]">
        <LineChart2 data={data.lineChart} isLoading={isLoading} />
      </div>
    </div>
  );
};
export default Stats;
