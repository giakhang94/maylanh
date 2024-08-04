import { InputType } from "@/types";
import { useState } from "react";

const useForm = (initialValues: InputType) => {
  const [input, setInput] = useState(initialValues);
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
  const setValues = (input: InputType) => {
    setInput(input);
  };
  return { input, handleChange, setValues };
};

export default useForm;
