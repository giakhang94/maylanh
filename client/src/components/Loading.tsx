import loading from "../assets/image/loading.svg";
interface Props {
  classname: string;
}
const Loading = ({ classname }: Props): React.JSX.Element => {
  return (
    <div
      className={`${classname} h-screen flex
      } justify-center items-center`}
    >
      <img src={loading} className={`h-[150px]`} alt="" />
    </div>
  );
};

export default Loading;
