import useDebounce from "@/hooks/useDebounce";
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
const SERVICES = [
  { title: "Bơm gas hột quẹt", value: "Bơm gas hột quẹt" },
  { title: "Bơm dầu bạc hà", value: "Bơm dầu bạc hà" },
  { title: "Lông vịt dép đứt mủ bể", value: "Lông vịt dép đứt mủ bể" },
];
const RENEW = [3, 6, 9, 12];
const Filter = ({ handleSubmit }: Props) => {
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
  return (
    <form className="flex flex-col justify-around mx-5 bg-white mt-5 border border-gray-300 rounded-md p-5 space-y-3">
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
      <div className="flex justify-between w-full space-x-4">
        <div className="w-1/2 flex items-center space-x-2">
          <select
            value={filterInput.services}
            onChange={handleChange}
            name="services"
            className="block w-1/2 border px-2 py-2 rounded-md"
          >
            <option value="">Tất cả dịch vụ</option>
            {SERVICES.map(
              (service: { title: string; value: string }, index: number) => {
                return (
                  <option key={index + "option service"} value={service.value}>
                    {service.title}
                  </option>
                );
              }
            )}
          </select>
          <select
            value={filterInput.renew}
            onChange={(e) => {
              handleChange(e);
              setFilterInput((prev) => ({ ...prev, from: "", to: "" }));
            }}
            name="renew"
            className="block w-1/2 border px-2 py-2 rounded-md"
          >
            <option value={0}>Đơn cách đây</option>
            {RENEW.map((month: number, index: number) => {
              return (
                <option key={index + "option renew"} value={month}>
                  {month} tháng
                </option>
              );
            })}
          </select>
        </div>
        <div className="flex space-x-10 w-1/2 justify-end py-1 min-w-[150px] border px-5 rounded-md">
          <input
            disabled={filterInput.renew > 0}
            type="date"
            placeholder="from"
            name="from"
            value={filterInput.from}
            onChange={handleChange}
            className={`w-1/2 outline-none ${
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
            onChange={handleChange}
            className={`w-1/2 outline-none ${
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
    </form>
  );
};

export default Filter;
