import React from "react";

import { useForm } from "./useForm";

const LoginForm4 = () => {
  const { values, errors, touched, handleBlur, handleChange, handleSubmit } =
    useForm({
      initialValues: { email: "", password: "" },
      validate: (values) => {
        const errors = {
          email: "",
          password: "",
        };

        if (!values.email) {
          errors.email = "이메일을 입력하세요";
        }
        if (!values.password) {
          errors.password = "비밀번호를 입력하세요";
        }

        return errors;
      },
      onSubmit: (values) => {
        alert(JSON.stringify(values, null, 2));
      },
    });

  return (
    <>
      <h1>4단계. 로그인 폼 만들기</h1>
      <form
        onSubmit={handleSubmit}
        style={{
          display: "flex",
          flexDirection: "column",
          gap: "5px",
        }}
      >
        <input
          type="text"
          name="email"
          value={values.email}
          onChange={handleChange}
          onBlur={handleBlur}
        />
        {touched.email && errors.email && <span>{errors.email}</span>}

        <input
          type="password"
          name="password"
          value={values.password}
          onChange={handleChange}
          onBlur={handleBlur}
        />
        {touched.password && errors.password && <span>{errors.password}</span>}

        <button type="submit">Login</button>
      </form>
    </>
  );
};

export default LoginForm4;
