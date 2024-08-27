import { useState } from "react";
import Pagination from "./Pagination";
import { GrFormNext, GrFormPrevious } from "react-icons/gr";

interface Props {
  numOfPages: number;
  currentPage: number;
  numberOfButton?: number;
  handleChangePage: (page: string) => void;
  total?: number;
}

const PaginationDotDot = ({
  numOfPages,
  currentPage,
  numberOfButton = 7,
  handleChangePage,
  total,
}: Props) => {
  //pagination này gồm 7 nút + 2 nút điều hướng và các ... (dotdot - enclipse?)
  let array: number[] = [];
  array[0] = 1;
  let btnCount = Math.min(numOfPages, numberOfButton);
  if (btnCount % 2 == 0) btnCount++;
  const middle = (btnCount - 1) / 2;
  array[middle] = currentPage;
  array[6] = numOfPages;
  for (let i = 1; i <= btnCount - 2; i++) {
    if (currentPage - 2 - 1 >= 2 && numOfPages - currentPage >= 2) {
      i < middle && (array[i] = currentPage - middle + i);
      i > middle && (array[i] = currentPage + i - middle);
    } else if (currentPage - 2 - 1 < 2) {
      array[i] = i + 1;
    } else if (numOfPages - currentPage < 2) {
      array[middle] = currentPage - middle + 1;
      i < middle && (array[i] = array[middle] - middle + i);
      i > middle && (array[i] = array[middle] + i - middle);
    }
  }

  const normalCase = currentPage - 2 - 1 >= 2 && numOfPages - currentPage > 3;
  //   if(numOfPages <=8) {
  //     return <Pagination />
  //   }
  if (numOfPages < 10) {
    return (
      <Pagination
        handleChangePage={handleChangePage}
        numOfPages={numOfPages}
        page={currentPage}
        total={total!}
      />
    );
  }
  if (normalCase)
    return (
      <div className="flex space-x-[1px] mb-5">
        <button
          className="bg-sky-500 text-white font-semibold w-8 h-8 flex justify-center items-center rounded-sm hover:opacity-[82.5%]"
          onClick={() => {
            if (Number(currentPage) === 1) {
              handleChangePage(numOfPages.toString());
            } else {
              handleChangePage((Number(currentPage) - 1).toString());
            }
          }}
        >
          <GrFormPrevious />
        </button>
        <button
          className={`bg-sky-${
            currentPage === 1 ? "600" : 500
          } text-white font-semibold w-8 h-8 flex justify-center items-center rounded-sm hover:opacity-[82.5%]`}
        >
          1
        </button>
        {
          <span className="text-2xl tracking-2 flex items-center h-full">
            ...
          </span>
        }
        {array.map((btn: number, index: number) => {
          if (btn != 1 && btn != numOfPages)
            return (
              <button
                className={`bg-sky-${
                  currentPage === btn ? "600" : 500
                } text-white font-semibold w-8 h-8 flex justify-center items-center rounded-sm hover:opacity-[82.5%]`}
              >
                {btn}
              </button>
            );
        })}
        {array[btnCount - 2] + 2 !== numOfPages && (
          <span className="text-2xl tracking-2 flex items-center h-full">
            ...
          </span>
        )}
        <button
          className={`bg-sky-${
            currentPage === numOfPages ? "600" : 500
          } text-white font-semibold w-8 h-8 flex justify-center items-center rounded-sm hover:opacity-[82.5%]`}
        >
          {numOfPages}
        </button>
        <button
          className="bg-sky-500 text-white font-semibold w-8 h-8 flex justify-center items-center rounded-sm hover:opacity-[82.5%]"
          onClick={() => {
            if (Number(currentPage) === numOfPages) {
              handleChangePage("1");
            } else {
              handleChangePage((Number(currentPage) + 1).toString());
            }
          }}
        >
          <GrFormNext />
        </button>
      </div>
    );
  return (
    <div className="flex space-x-[1px] mb-5">
      <button
        className="bg-sky-500 text-white font-semibold w-8 h-8 flex justify-center items-center rounded-sm hover:opacity-[82.5%]"
        onClick={() => {
          if (Number(currentPage) === 1) {
            handleChangePage(numOfPages.toString());
          } else {
            handleChangePage((Number(currentPage) - 1).toString());
          }
        }}
      >
        <GrFormPrevious />
      </button>
      <button
        className={`bg-sky-${
          currentPage === 1 ? "600" : 500
        } text-white font-semibold w-8 h-8 flex justify-center items-center rounded-sm hover:opacity-[82.5%]`}
      >
        1
      </button>
      {numOfPages - (currentPage + 2) < 2 && (
        <span className="text-xl tracking-2 flex items-center h-full">...</span>
      )}
      {array.map((btn: number, index: number) => {
        if (btn != 1 && btn != numOfPages)
          return (
            <button
              className={`bg-sky-${
                currentPage === btn ? "600" : 500
              } text-white font-semibold w-8 h-8 flex justify-center items-center rounded-sm hover:opacity-[82.5%]`}
            >
              {btn}
            </button>
          );
      })}
      {numOfPages - currentPage > 3 && (
        <span className="text-2xl tracking-2 flex items-center h-full">
          ...
        </span>
      )}
      <button
        className={`bg-sky-${
          currentPage === numOfPages ? "600" : 500
        } text-white font-semibold w-8 h-8 flex justify-center items-center rounded-sm hover:opacity-[82.5%]`}
      >
        {numOfPages}
      </button>
      <button
        className="bg-sky-500 text-white font-semibold w-8 h-8 flex justify-center items-center rounded-sm hover:opacity-[82.5%]"
        onClick={() => {
          if (Number(currentPage) === numOfPages) {
            handleChangePage("1");
          } else {
            handleChangePage((Number(currentPage) + 1).toString());
          }
        }}
      >
        <GrFormNext />
      </button>
    </div>
  );
};

export default PaginationDotDot;
