interface Props {
  type: string;
  name: string;
  placeholder?: string;
  value: string | number;
  label: string;
  disabled?: boolean;
  handleInputChange: (e: any) => void;
  classname?: string;
}

const Input = (props: Props): React.JSX.Element => {
  return (
    <div className="mb-3 ">
      <label htmlFor="" className="font-semibold tracking-[1px]">
        {props.label}
      </label>
      <div>
        <input
          type={props.type}
          onChange={props.handleInputChange}
          value={props.value}
          id={props.name}
          name={props.name}
          placeholder={props.placeholder}
          className={
            "border border-gray-300 py-1 px-2 min-w-[300px] w-full rounded-md outline-none" +
            props.classname
          }
          disabled={props.disabled}
        />
      </div>
    </div>
  );
};

export default Input;
