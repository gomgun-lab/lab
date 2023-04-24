import { useState, useCallback, useEffect } from "react";
import type {
  ChangeEventHandler,
  FocusEventHandler,
  FormEventHandler,
} from "react";
import * as Yup from "yup";

type Message = string;
type FieldName = string;

type FieldValue = FieldValues[FieldName];
type FieldValues = Record<FieldName, any>;

type FieldError = {
  message?: Message;
};

type FieldErrors<T extends FieldValues = FieldValues> = {
  [K in keyof T]: FieldError;
};

type ResolverSuccess<TFieldValues extends FieldValues = FieldValues> = {
  values: TFieldValues;
  errors: {};
};

type ResolverError<TFieldValues extends FieldValues = FieldValues> = {
  values: {};
  errors: FieldErrors<TFieldValues>;
};

type ResolverResult<TFieldValues extends FieldValues = FieldValues> =
  | ResolverSuccess<TFieldValues>
  | ResolverError<TFieldValues>;

export type Resolver<TFieldValues extends FieldValues = FieldValues> = (
  values: TFieldValues
) => Promise<ResolverResult<TFieldValues>> | ResolverResult<TFieldValues>;

type FormValues = Record<string, any>;

interface useFormArgs<T extends FormValues> {
  initialValues: T;
  onSubmit: (values: T) => void;
  resolver?: Resolver<T>;
}

export const useFormWithResolver = <T extends FormValues>({
  initialValues,
  onSubmit,
  resolver,
}: useFormArgs<T>) => {
  const [values, setValues] = useState<T>(initialValues);
  const [errors, setErrors] = useState<Partial<T>>({});
  const [touched, setTouched] = useState<Partial<T>>({} as unknown as T);

  const handleChange: ChangeEventHandler<HTMLInputElement> = ({ target }) => {
    const { name, value } = target;
    setValues({
      ...values,
      [name]: value,
    });
  };

  const handleBlur: FocusEventHandler<HTMLInputElement> = ({ target }) => {
    const { name } = target;
    setTouched({
      ...touched,
      [name]: true,
    });
  };

  const handleSubmit: FormEventHandler = async (e) => {
    e.preventDefault();

    setTouched(
      Object.keys(values).reduce((touched, field) => {
        (touched as unknown as any)[field] = true;
        return touched;
      }, {} as T)
    );

    if (resolver) {
      const result = await resolver(values);
      setErrors(result.errors as Partial<T>);

      if ("values" in result) {
        onSubmit(result.values as T);
        return;
      }
    } else {
      onSubmit(values);
    }
  };

  useEffect(() => {
    if (resolver) {
      (async () => {
        const result = await resolver(values);
        setErrors(result.errors as Partial<T>);
      })();
    }
  }, [values, resolver]);

  const getFeildProps = (name: string) => {
    const value = values[name];
    const onBlur = handleBlur;
    const onChange = handleChange;

    return {
      name,
      value,
      onBlur,
      onChange,
    };
  };

  return {
    values,
    errors,
    touched,
    handleChange,
    handleBlur,
    handleSubmit,
    getFeildProps,
  };
};
