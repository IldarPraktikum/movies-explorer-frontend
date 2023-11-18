import { useState } from "react";

export function useFormValidation(initialValues = {}) {
  const [values, setValues] = useState(initialValues);
  const [error, setError] = useState({});
  const [isValid, setIsValid] = useState(false);

  const handleChange = (event) => {
    const { value, name, validationMessage } = event.target;
    setError({ ...error, [name]: validationMessage });
    setValues({ ...values, [name]: value });
    setIsValid(event.currentTarget.form.checkValidity());
  };

  const resetInput = () => {
    setValues(initialValues);
    setError({});
    setIsValid(false);
  };

  return { values, error, isValid, setValues, handleChange, resetInput };
}


