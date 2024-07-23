interface Props {
  children?: React.JSX.Element;
  handleCloseModal: (e?: React.KeyboardEvent<HTMLDivElement>) => void;
}

const PurchaseModal = ({
  children,
  handleCloseModal,
}: Props): React.JSX.Element => {
  return (
    <div
      className="fixed overflow-auto inset-0 w-screen min-h-screen h-full  z-50 bg-[#00000038]"
      id="purchase-modal"
      onClick={(e: any) => {
        if (e.target.id === "purchase-modal") {
          handleCloseModal();
        }
      }}
    >
      {children}
    </div>
  );
};

export default PurchaseModal;
