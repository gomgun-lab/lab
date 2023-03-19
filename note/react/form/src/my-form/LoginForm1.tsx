import React, { ChangeEvent, FormEvent, useState } from "react";

const LoginForm1 = () => {
  const [values, setValues] = useState({
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
    alert(JSON.stringify(values, null, 2));
  };

  return (
    <>
      <h1>1단계. 로그인 폼 만들기</h1>
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
        <input
          type="password"
          name="password"
          value={values.password}
          onChange={handleChange}
        />
        <button type="submit">Login</button>
      </form>
    </>
  );
};

export default LoginForm1;
