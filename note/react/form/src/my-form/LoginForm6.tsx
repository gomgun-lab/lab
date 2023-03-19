import React from "react";

import { Form, Field, ErrorMessage } from "./formContext";

interface LoginForm {
  username: string;
  password: string;
}

const LoginForm6 = () => {
  const validate = (values: LoginForm) => {
    const errors = {
      username: "",
      password: "",
    };

    if (!values.username) {
      errors.username = "유저이름을 입력하세요";
    }
    if (!values.password) {
      errors.password = "비밀번호를 입력하세요";
    }

    return errors;
  };

  const handleSubmit = (values: LoginForm) => {
    alert(JSON.stringify(values, null, 2));
  };

  return (
    <>
      <h1>6단계. 컨텍스트</h1>
      <Form<LoginForm>
        initialValues={{ username: "", password: "" }}
        validate={validate}
        onSubmit={handleSubmit}
      >
        <Field type="text" name="username" />
        <ErrorMessage name="username" />
        <Field type="password" name="password" />
        <ErrorMessage name="password" />
        <button type="submit">login</button>
      </Form>
    </>
  );
};

export default LoginForm6;
