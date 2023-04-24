import { createContext, useContext } from "react";
import { useForm } from "./useForm";
import { useFormWithResolver } from "./useFormWithResolver";

import type { PropsWithChildren } from "react";
import type { FormValues } from "./types";

import * as Yup from "yup";

import type { Resolver } from "./useFormWithResolver";

interface useFormArgs<T extends FormValues> {
  initialValues: T;
  onSubmit: (values: T) => void;
  validationSchema?: Yup.ObjectSchema<T>;
  resolver?: Resolver<T>;
}

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
  const formValue = useFormWithResolver<T>(props);

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
  const { getFeildProps } = useContext(FormContext);
  return <input {...props} {...getFeildProps(props.name)} />;
};

interface ErrorMessageProps {
  name: string;
}

export const ErrorMessage = ({ name }: ErrorMessageProps) => {
  const { touched, errors, values } = useContext(FormContext);
  if (!touched[name] || !errors[name]) {
    return null;
  }

  console.log(touched);
  console.log(errors);
  console.log(errors[name].message);

  return <span>{errors[name].message}</span>;
};
