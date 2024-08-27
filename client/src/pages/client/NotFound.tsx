import notFoundImg from "@/assets/image/pageNotFound.svg";
const NotFoundPage = () => {
  return (
    <div className="flex w-full items-center h-screen justify-center Plaptop:flex-row Pdesktop:flex-row Psmallmobile:flex-col Pmobile:flex-col PbigTablet:flex-row Ptablet:flex-col">
      <div className=" h-[350px] w-full">
        <img
          src={notFoundImg}
          className="h-full w-full min-w-[350px]"
          alt="not found img"
        />
      </div>
    </div>
  );
};

export default NotFoundPage;
