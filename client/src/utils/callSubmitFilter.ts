import { QueryState } from "@/pages/dashboard/Component/Filter";

interface Props {
  filterInput: QueryState;
  handleSubmit: (queryString: string) => void;
}

const callSubmitFilter = ({ filterInput, handleSubmit }: Props) => {
  const queryKey = Object.keys(filterInput);
  let queryString = "";
  queryKey.map((key) => {
    queryString = queryString + `${key}=${(filterInput as any)[key]}&`;
  });
  queryString = queryString.slice(0, queryString.length - 1);
  handleSubmit(queryString);
};

export default callSubmitFilter;
