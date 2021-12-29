import { useState } from "react";

export const useForm = (initialValues: any) => {
  const [values, setValues] = useState(initialValues);
  return [
    values,
      ( e: { target: { name: string; value: string; }; }) => {
        setValues({
            ...values,
            [e.target.name]: e.target.value
        });
    }
  ];
};