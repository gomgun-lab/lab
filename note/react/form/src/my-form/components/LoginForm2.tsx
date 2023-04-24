import React, { ChangeEvent, FormEvent, useState } from "react";

const LoginForm2 = () => {
  const [values, setValues] = useState({
    email: "",
    password: "",
  });

  const [errors, setErrors] = useState({
    email: "",
    password: "",
  });

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setValues({
      ...values,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const errors = validate();

    setErrors(errors);

    if (Object.values(errors).some((v) => v)) {
      return;
    }

    alert(JSON.stringify(values, null, 2));
  };

  const validate = () => {
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
  };

  return (
    <>
      <h1>2단계. 로그인 폼 만들기</h1>
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
        />
        {errors.email && <span>{errors.email}</span>}
        <input
          type="password"
          name="password"
          value={values.password}
          onChange={handleChange}
        />
        {errors.password && <span>{errors.password}</span>}
        <button type="submit">Login</button>
      </form>
    </>
  );
};

export default LoginForm2;
