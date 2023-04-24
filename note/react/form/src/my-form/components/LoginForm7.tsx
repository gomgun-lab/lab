import React from "react";

import { Form, Field, ErrorMessage } from "./formContextVResolver";

import { schema } from "../yup/schema";
import { yupResolver } from "../yup/resolver";

interface LoginForm {
  email: string;
  password: string;
  passwordConfirmation: string;
  nickname: string;
}

const initValues: LoginForm = {
  email: "",
  password: "",
  passwordConfirmation: "",
  nickname: "",
};

const LoginForm7 = () => {
  const handleSubmit = (values: LoginForm) => {
    alert(JSON.stringify(values, null, 2));
  };

  return (
    <>
      <h1>7단계. 컨텍스트</h1>
      <Form<LoginForm>
        initialValues={initValues}
        onSubmit={handleSubmit}
        resolver={yupResolver(schema)}
      >
        <Field type="email" name="email" />
        <ErrorMessage name="email" />
        <Field type="password" name="password" />
        <ErrorMessage name="password" />
        <Field type="password" name="passwordConfirmation" />
        <ErrorMessage name="passwordConfirmation" />
        <Field type="text" name="nickname" />
        <ErrorMessage name="nickname" />
        <button type="submit">login</button>
      </Form>
    </>
  );
};

export default LoginForm7;
