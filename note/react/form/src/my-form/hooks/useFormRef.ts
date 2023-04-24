import { useState, useCallback, useEffect, useRef } from "react";
import type { FieldValues, FieldErrors } from "../types";

export type ValidationMode = {
  onBlur: "onBlur";
  onChange: "onChange";
  onSubmit: "onSubmit";
  onTouched: "onTouched";
  all: "all";
};

export type Mode = keyof ValidationMode;

export type FieldNamesMarkedBoolean<TFieldValues extends FieldValues> = Map<
  Partial<TFieldValues>,
  boolean
>;

type FormState<TFieldValues extends FieldValues = FieldValues> = {
  errors: Partial<Readonly<FieldErrors<TFieldValues>>>;
  toucedFields: Partial<Readonly<FieldNamesMarkedBoolean<TFieldValues>>>;
  isValid: boolean;
};

interface useFormArgs<TFieldValues extends FieldValues> {
  initialValues: TFieldValues;
  onSubmit: (values: TFieldValues) => void;
  validate?: (values: TFieldValues) => Partial<TFieldValues>;
  mode?: Mode;
}

export const useForm = <T extends FieldValues>({
  initialValues,
  validate,
  onSubmit,
}: useFormArgs<T>) => {
  const valuesRef = useRef<T>(initialValues);
  // const [errors, setErrors] = useState<Partial<T>>({});
  // const [touched, setTouched] = useState<Partial<T>>({} as unknown as T);

  const [formState, setFormState] = useState<FormState<T>>({
    toucedFields: {},
    errors: {},
    isValid: false,
  });

  const runValidator = useCallback(() => {
    if (validate) {
      const errors = validate(valuesRef.current);
      setErrors(errors);
    }
  }, [validate]);

  const register = (name: keyof T) => ({
    name,
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => {
      const { value } = e.target;
      valuesRef.current = {
        ...valuesRef.current,
        [name]: value,
      };
      runValidator();
    },
    onBlur: () => {
      setTouched({
        ...touched,
        [name]: true,
      });
      runValidator();
    },
  });

  const handleSubmit: React.FormEventHandler = (e) => {
    e.preventDefault();

    setTouched(
      Object.keys(valuesRef.current).reduce((touched, field) => {
        (touched as unknown as any)[field] = true;
        return touched;
      }, {} as T)
    );

    runValidator();

    if (Object.values(errors).some((e) => e)) {
      return;
    }

    onSubmit(valuesRef.current);
  };

  return {
    values: valuesRef.current,
    errors: formState.errors,
    touched: formState.toucedFields,
    register,
    handleSubmit,
  };
};
