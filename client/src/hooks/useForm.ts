import { InputType } from "@/pages/client/Services";
import { useState } from "react";

const useForm = (formInput: InputType) => {
  const [input, setInput] = useState(formInput);
  const handleChange = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    if (event.target.type === "checkbox") {
      setInput((prev) => ({
        ...prev,
        [event.target.name]: (event.target as HTMLInputElement).checked,
      }));
    } else {
      setInput((prev) => ({
        ...prev,
        [event.target.name]: event.target.value,
      }));
    }
  };
  const changeInput = (input: InputType) => {
    setInput(input);
  };
  return { input, handleChange, changeInput };
};

export default useForm;
