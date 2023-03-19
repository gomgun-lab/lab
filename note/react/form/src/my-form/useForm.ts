import { useState, useCallback, useEffect } from "react";
import type {
  ChangeEventHandler,
  FocusEventHandler,
  FormEventHandler,
} from "react";
import type { FormValues, useFormArgs } from "./types";

/**
 * @todo
 * touched 필드를 정교하게 타이핑할 필요가 있어보인다.
 * 1. touched 객체의 키와 values 객체의 키는 항상 동기화 상태로 유지되어야 한다.
 *  values = { name: 1, email: 2, password: 3 }
 *  touched = { name: true, email: true, password: true, address: true }
 *  위와 같은 상황에서 타입 에러를 발생시켜야 함
 * 2. touched 객체의 값은 boolean 타입이어야 한다.
 *  touched = { name: 1}
 *  위와 같은 상황에서 타입 에러를 발생시켜야 함
 */

// type TouchedFields<T extends FormValues> = Record<keyof T, boolean>;

export const useForm = <T extends FormValues>({
  initialValues,
  validate,
  onSubmit,
}: useFormArgs<T>) => {
  /**
   * @todo
   * controlled => uncontrolled
   */
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

  const handleSubmit: FormEventHandler = (e) => {
    e.preventDefault();

    setTouched(
      Object.keys(values).reduce((touched, field) => {
        /**
         * @todo
         * touched에 명시적으로 타이핑한 부분을 지우면 에러발생 이유를 모르겠음.
         */
        (touched as unknown as any)[field] = true;
        return touched;
      }, {} as T)
    );

    const errors = validate(values);
    setErrors(errors);

    if (Object.values(errors).some((e) => e)) {
      return;
    }

    onSubmit(values);
  };

  const runValidator = useCallback(() => validate(values), [values]);

  useEffect(() => {
    const errors = runValidator();
    setErrors(errors);
  }, [runValidator]);

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
