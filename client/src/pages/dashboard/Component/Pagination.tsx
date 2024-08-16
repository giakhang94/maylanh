import { GrFormNext, GrFormPrevious } from "react-icons/gr";
interface Props {
  total: number;
  numOfPages: number;
  handleChangePage: (page: string) => void;
  page: number;
}

const Pagination = (props: Props) => {
  const pagesArray = new Array(props.numOfPages).fill("1");
  return (
    <div className="flex space-x-[1px] mb-5 w-full justify-center ">
      <button className="bg-sky-500 text-white font-semibold w-8 h-8 flex justify-center items-center rounded-sm hover:opacity-[82.5%]">
        <GrFormPrevious />
      </button>
      {pagesArray.map((numbber: any, index: number) => {
        return (
          <button
            key={index + "pagi"}
            className={`bg-sky-${
              index + 1 === Number(props.page) ? "600" : "500"
            } text-white font-semibold w-8 h-8 flex justify-center items-center rounded-sm hover:opacity-[82.5%]`}
            onClick={() => {
              props.handleChangePage((index + 1).toString());
            }}
          >
            {index + 1}
          </button>
        );
      })}
      <button className="bg-sky-500 text-white font-semibold w-8 h-8 flex justify-center items-center rounded-sm hover:opacity-[82.5%]">
        <GrFormNext />
      </button>
    </div>
  );
};

export default Pagination;
