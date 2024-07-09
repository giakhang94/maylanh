import loading from "../assets/image/loadingForBtn.svg";
interface Props {
  classname: string;
}
const LoadingForButton = ({ classname }: Props): React.JSX.Element => {
  return (
    <div className={`${classname} h-5 justify-center items-center`}>
      <img src={loading} alt="" className="h-full" />
    </div>
  );
};

export default LoadingForButton;
