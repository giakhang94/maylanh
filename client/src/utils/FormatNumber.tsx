interface Props {
  number: Number | String;
}

const NumberFormat = (props: Props): React.JSX.Element => {
  const number = Number(props.number);
  const formatedNumber = number.toLocaleString();

  return <>{formatedNumber}</>;
};

export default NumberFormat;
