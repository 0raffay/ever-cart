import { useState } from "react";

export const useForm = () => {
  const [form, setForm] = useState({});

  const handleChange = (fieldName: string, value: string) => {
    setForm((prev) => ({ ...prev, [fieldName]: value }));
  };

  const handleUpdateFormFields = (value: string[]) => {
    setForm(value);
  };

  return {
    formFields: form,
    handleChange,
    handleUpdateFormFields,
  };
};
