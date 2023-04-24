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

export type ResolverSuccess<TFieldValues extends FieldValues = FieldValues> = {
  values: TFieldValues;
  errors: {};
};

export type ResolverError<TFieldValues extends FieldValues = FieldValues> = {
  values: {};
  errors: FieldErrors<TFieldValues>;
};

export type ResolverResult<TFieldValues extends FieldValues = FieldValues> =
  | ResolverSuccess<TFieldValues>
  | ResolverError<TFieldValues>;

export const yupResolver: YupResolver = <T extends FieldValues>(
  schema: Yup.ObjectSchema<T>
) => {
  return async (values) => {
    try {
      const validatedValues = await schema.validate(values, {
        abortEarly: false,
      });
      return { values: validatedValues, errors: {} };
    } catch (err) {
      if (err instanceof Yup.ValidationError) {
        const errors = err.inner.reduce((acc, error) => {
          if (error.path) {
            acc[error.path as keyof typeof errors] = { message: error.message };
          }
          return acc;
        }, {} as FieldErrors<T>);
        console.log(errors);
        return { values: {}, errors };
      }
      throw err;
    }
  };
};

export type YupResolver = <T extends Yup.ObjectSchema<any>>(
  schema: T
) => <TFieldValues extends FieldValues>(
  values: TFieldValues
) => Promise<ResolverResult<TFieldValues>>;
