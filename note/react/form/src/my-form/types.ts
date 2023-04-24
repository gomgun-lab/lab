export type FormValues = Record<string, any>;
export type useFormArgs<T extends FormValues> = {
  initialValues: T;
  validate: (values: T) => Partial<T>;
  onSubmit: (values: T) => void;
};

export type Message = string;
export type FieldName = string;
export type FieldValue = FieldValues[FieldName];
export type FieldValues = Record<FieldName, any>;
export type FieldError = {
  message?: Message;
};
export type FieldErrors<T extends FieldValues = FieldValues> = {
  [K in keyof T]: FieldError;
};
