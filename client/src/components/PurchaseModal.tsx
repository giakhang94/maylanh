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
      className="absolute inset-0 w-screen h-screen  z-50 bg-[#00000038]"
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
