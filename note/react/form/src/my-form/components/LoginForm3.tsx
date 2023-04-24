import React, { useState, useCallback, useEffect } from "react";
import type { ChangeEvent, FormEvent, FocusEvent } from "react";

const LoginForm3 = () => {
  const [values, setValues] = useState({
    email: "",
    password: "",
  });

  const [errors, setErrors] = useState({
    email: "",
    password: "",
  });

  const [touched, setTouched] = useState({
    email: false,
    password: false,
  });

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setValues({
      ...values,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    setTouched({
      email: true,
      password: true,
    });

    validate();

    if (Object.values(errors).some((v) => v)) {
      return;
    }

    alert(JSON.stringify(values, null, 2));
  };

  const handleBlur = (e: FocusEvent<HTMLInputElement>) => {
    setTouched({
      ...touched,
      [e.target.name]: true,
    });
  };

  /*
   * values 즉, input의 값이 변경될 때마다 valdiate 함수를 재생성한다.
   */
  const validate = useCallback(() => {
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

    setErrors(errors);
  }, [values]);

  /*
   * values 즉, input의 값이 변경될 때마다 valdiate 함수 재생성한다.
   * validate 함수가 변경될 때마다 validate 함수를 호출한다.
   * 따라서 입력 필드 값이 변경될 때마다 validate 함수가 실행된다.
   */
  useEffect(() => {
    validate();
    console.log("validate");
  }, [validate]);

  return (
    <>
      <h1>3단계. 로그인 폼 만들기</h1>
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
          onBlur={handleBlur}
          onChange={handleChange}
        />
        {touched.email && errors.email && <span>{errors.email}</span>}
        <input
          type="password"
          name="password"
          value={values.password}
          onBlur={handleBlur}
          onChange={handleChange}
        />
        {touched.password && errors.password && <span>{errors.password}</span>}
        <button type="submit">Login</button>
      </form>
    </>
  );
};

export default LoginForm3;
