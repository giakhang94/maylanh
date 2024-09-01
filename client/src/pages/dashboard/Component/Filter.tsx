import { Loading } from "@/components";
import { useAppContext } from "@/Context/appContext";
import customAxios from "@/utils/authFecth";
import callSubmitFilter from "@/utils/callSubmitFilter";
import { useEffect, useState } from "react";
import { CiSearch } from "react-icons/ci";
import { MdClose } from "react-icons/md";

interface Props {
  handleSubmit: (queryString: string) => void;
}
export interface QueryState {
  services: string;
  search: string;
  from: string;
  to: string;
  renew: number;
}
const initialFilter: QueryState = {
  services: "",
  search: "",
  from: "",
  to: "",
  renew: 0,
};

const RENEW = [3, 6, 9, 12];
const Filter = ({ handleSubmit }: Props) => {
  const [service, setService] = useState<{ service: []; isloading: boolean }>({
    service: [],
    isloading: true,
  });
  const [show, setShow] = useState<boolean>(true);
  const [filterInput, setFilterInput] = useState<QueryState>(initialFilter);
  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    setFilterInput((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleClick = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    e.preventDefault();
    callSubmitFilter({ filterInput, handleSubmit });
  };

  useEffect(() => {
    const timeout = setTimeout(() => {
      callSubmitFilter({ filterInput, handleSubmit });
    }, 825);
    return () => {
      clearTimeout(timeout);
    };
  }, [filterInput.search]);
  useEffect(() => {
    const getService = async () => {
      const { data } = await customAxios().get("/service");
      setService((prev) => ({
        ...prev,
        service: data.services,
        isloading: false,
      }));
    };
    getService();
  }, []);
  let serviceArray = [];
  serviceArray =
    service &&
    service.service.reduce((accum: any, current: any) => {
      accum.push({ title: current.name, value: current.name });
      return accum;
    }, []);
  return (
    <form className="relative flex flex-col justify-around mx-5 bg-white mt-5 border border-gray-300 rounded-md p-5 space-y-3 Ptablet:w-[100%] PbigTablet:w-[100%] Plaptop:w-[100%] Pdesktop:w-[100%] Pmobile:w-[350px] Psmallmobile:w-[280px]">
      {show && (
        <div className="absolute top-1 right-1">
          <MdClose
            className="text-red-500  hover:scale-120"
            onClick={() => {
              setShow(false);
            }}
          />
        </div>
      )}
      {!show && (
        <span
          className=" py-1 px-2 rounded-md flex justify-center items-center bg-sky-200 text-sky-500 font-semibold text-sm cursor-pointer"
          onClick={() => {
            setShow(true);
          }}
        >
          Show Filter
        </span>
      )}
      {show && (
        <>
          <div className="flex items-center border p-3">
            <CiSearch className="text-gray-500" size={20} />
            <input
              className=" py-1 px-3 rounded-md min-w-[150px] w-full outline-none tracking-[1px]"
              type="text"
              placeholder="search anything"
              name="search"
              value={filterInput.search}
              onChange={handleChange}
            />
            <button
              type="button"
              onClick={(e) => {
                setFilterInput((prev) => ({ ...prev, search: "" }));
              }}
            >
              <MdClose className="text-gray-300 hover:text-sky-500 hover:scale-110 transition-all-0.5s" />
            </button>
          </div>
          <div className="Platop:flex Pdesktop:flex Ptablet:flex Ptablet:flex-row PbigTablet:flex-row Pdesktop:flex-row Plaptop:flex-row PbigTablet:flex Pmobile:flex Pmobile:flex-col Psmallmobile:flex Psmallmobile:flex-col justify-between w-full Plaptop:space-x-4 Pdesktop:space-x-4 Ptablet:space-x-4 PbigTablet:space-x-4 Pmobile:space-y-1 Psmallmobile:space-y-1">
            <div className=" Ptablet:flex-row PbigTablet:flex-row Pdesktop:flex-row Plaptop:flex-row Plaptop:w-1/2 Pdesktop:w-1/2 Ptablet:w-1/2 PbigTablet:w-1/2 Pmobile:w-full Psmallmobile:w-full Platop:flex Pdesktop:flex Ptablet:flex PbigTablet:flex Pmobile:flex Pmobile:flex-col Psmallmobile:flex Psmallmobile:flex-col items-center Plaptop:space-x-2 Pdesktop:space-x-2 Ptablet:space-x-2 PbigTablet:space-x-2 Pmobile:space-y-1 Psmallmobile:space-y-1">
              {service?.isloading ? (
                <div className="text-lg font-semibold tracking-[1px]">
                  loading....
                </div>
              ) : (
                <select
                  value={filterInput.services}
                  onChange={handleChange}
                  name="services"
                  className="block Plaptop:w-full Pdesktop:w-full Ptablet:w-full PbigTablet:w-full Pmobile:w-full Psmallmobile:w-full border px-2 py-2 rounded-md"
                >
                  <option value="">Tất cả dịch vụ</option>
                  {serviceArray.map(
                    (
                      service: { title: string; value: string },
                      index: number
                    ) => {
                      return (
                        <option
                          key={index + "option service"}
                          value={service.value}
                        >
                          {service.title}
                        </option>
                      );
                    }
                  )}
                </select>
              )}
              {/* <select
                value={filterInput.renew}
                disabled={filterInput.from !== "" || filterInput.to !== ""}
                onChange={(e) => {
                  handleChange(e);
                  setFilterInput((prev) => ({ ...prev, from: "", to: "" }));
                }}
                name="renew"
                className={` Plaptop:w-1/2 Pdesktop:w-1/2 Ptablet:w-1/2 PbigTablet:w-1/2 Pmobile:w-full Psmallmobile:w-full block w-1/2 border px-2 py-2 rounded-md ${
                  filterInput.from !== "" || filterInput.to !== ""
                    ? "text-gray-300"
                    : ""
                }`}
              >
                <option value={0}>Đơn cách đây</option>
                {RENEW.map((month: number, index: number) => {
                  return (
                    <option key={index + "option renew"} value={month}>
                      {month} tháng
                    </option>
                  );
                })}
              </select> */}
            </div>
            <div className="flex w-1/2 justify-end py-1 min-w-[150px] border px-5 rounded-md  Plaptop:w-1/2 Pdesktop:w-1/2 Ptablet:w-1/2 PbigTablet:w-1/2 Pmobile:w-full Psmallmobile:w-full Platop:flex Pdesktop:flex Ptablet:flex Ptablet:flex-row PbigTablet:flex-row Pdesktop:flex-row Plaptop:flex-row PbigTablet:flex Pmobile:flex Pmobile:flex-col Psmallmobile:flex Psmallmobile:flex-col Plaptop:space-x-10 Pdesktop:space-x-10 Ptablet:space-x-10 PbigTablet:space-x-10 Pmobile:space-y-1 Psmallmobile:space-y-1">
              <input
                disabled={filterInput.renew > 0}
                type="date"
                placeholder="from"
                name="from"
                value={filterInput.from}
                onChange={(e) => {
                  setFilterInput((prev) => ({ ...prev, renew: 0 }));
                  handleChange(e);
                }}
                className={`Plaptop:w-1/2 Pdesktop:w-1/2 Ptablet:w-1/2 PbigTablet:w-1/2 Pmobile:w-full Psmallmobile:w-full outline-none ${
                  filterInput.renew > 0 ? "text-gray-300" : ""
                }`}
              />
              <div className="w-[1px] h-full bg-gray-300"></div>
              <input
                disabled={filterInput.renew > 0}
                type="date"
                placeholder="to"
                name="to"
                value={filterInput.to}
                onChange={(e) => {
                  setFilterInput((prev) => ({ ...prev, renew: 0 }));
                  handleChange(e);
                }}
                className={`Plaptop:w-1/2 Pdesktop:w-1/2 Ptablet:w-1/2 PbigTablet:w-1/2 Pmobile:w-full Psmallmobile:w-full outline-none ${
                  filterInput.renew > 0 ? "text-gray-300" : ""
                }`}
                min={filterInput.from}
              />
            </div>
          </div>
          <div className="w-full flex items-center space-x-1">
            <button
              type="submit"
              onClick={handleClick}
              className="bg-sky-500 text-white font-semibold tracking-[1px] py-2 rounded-md w-[70%]"
            >
              Search
            </button>
            <button
              type="button"
              onClick={() => {
                setFilterInput(initialFilter);
              }}
              className="w-[30%] bg-red-200 py-2 rounded-md text-red-500 font-semibold tracking-[1px]"
            >
              Clear
            </button>
          </div>
        </>
      )}
    </form>
  );
};

export default Filter;
