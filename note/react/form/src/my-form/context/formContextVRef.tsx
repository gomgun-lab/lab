import { createContext, useContext } from "react";
import { useForm } from "./useFormRef";

import type { PropsWithChildren } from "react";
import type { FormValues, useFormArgs } from "./types";

/**
 * @todo
 * createContext의 디폴트 값 타입 any => useFormArgs
 */
const FormContext = createContext<any>({});
FormContext.displayName = "FormContext";

type FormProps<T extends FormValues> = useFormArgs<T>;

export const Form = <T extends FormValues>({
  children,
  ...props
}: PropsWithChildren<FormProps<T>>) => {
  const formValue = useForm<T>(props);

  return (
    <FormContext.Provider value={formValue}>
      <form
        onSubmit={formValue.handleSubmit}
        style={{
          display: "flex",
          flexDirection: "column",
          gap: "5px",
        }}
      >
        {children}
      </form>
    </FormContext.Provider>
  );
};

interface FieldProps {
  type: string;
  name: string;
}

export const Field = (props: FieldProps) => {
  const { register } = useContext(FormContext);
  return <input {...props} {...register(props.name)} />;
};

interface ErrorMessageProps {
  name: string;
}

export const ErrorMessage = ({ name }: ErrorMessageProps) => {
  const { touched, errors } = useContext(FormContext);
  if (!touched[name] || !errors[name]) {
    return null;
  }

  return <span>{errors[name]}</span>;
};
