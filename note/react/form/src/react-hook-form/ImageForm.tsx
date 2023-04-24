import { useForm, SubmitHandler } from "react-hook-form";
import React from "react";

type FormValues = {
  email: string;
  date: string;
  profile: File;
};

const ImageForm = () => {
  const { register, handleSubmit } = useForm<FormValues>();
  const onSubmit = handleSubmit((data) => console.log(data));

  return (
    <form onSubmit={onSubmit}>
      <input type="email" {...register("email")} />
      <input type="date" {...register("date")} />
      <input type="file" {...register("profile")} />
      <button type="submit">submit</button>
    </form>
  );
};

export default ImageForm;
