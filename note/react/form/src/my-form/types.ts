export type FormValues = Record<string, any>;
export type useFormArgs<T extends FormValues> = {
  initialValues: T;
  validate: (values: T) => Partial<T>;
  onSubmit: (values: T) => void;
};
