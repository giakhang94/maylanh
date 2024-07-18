import NumberFormat from "../utils/FormatNumber";

interface Props {
  isEdit: { id: string; edit: boolean };
  id: string;
  value: string | number;
  oldValue: string | number;
  element: "span" | "input" | "p";
  type: "text" | "number" | "checkbox";
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  classname?: string;
  name: string;
}

const FlexibleInput = (props: Props): React.JSX.Element => {
  if (props.id === props.isEdit.id) {
    return (
      <div className="p-1 text-gray-500 rounded-md w-fit max-w-[200px]">
        <input
          type={props.type}
          value={props.value || props.oldValue}
          onChange={props.onChange}
          name={props.name}
          className="w-full"
        />
      </div>
    );
  } else {
    const Element = props.element;
    const isPrice = props.name === "price" || props.name === "promotionPrice";
    if (isPrice) {
      return (
        <Element className={props.classname && props.classname + "relative"}>
          {props.id === props.isEdit.id ? (
            <NumberFormat number={props.value} />
          ) : (
            <NumberFormat number={props.oldValue} />
          )}
          <span className="">đ</span>
        </Element>
      );
    }
    return (
      <Element className={props.classname && props.classname}>
        {props.id === props.isEdit.id ? props.value : props.oldValue}{" "}
      </Element>
    );
  }
};

export default FlexibleInput;
