import React, { useEffect } from "react";
import { useMutation } from "@tanstack/react-query";
import { useForm, FormProvider, SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { object, string, TypeOf, z } from "zod";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";

import FormInput from "../components/FormInput";
import LoadingButton from "../components/LoadingButton";
import Message from "../components/Message";

import { signUpUserFn } from "../api/authApi";
import useStore from "../store";

const registerSchema = object({
  name: string().min(1, "Full name is required").max(100),
  email: string().min(1, "Email is required").email("Email is invalid"),
  password: string()
    .min(1, "Password is required")
    .min(8, "Password must be at least 8 characters")
    .max(32, "Password must be at most 32 characters"),
  passwordConfirm: string().min(1, "Please confirm your password"),
}).refine((data) => data.password === data.passwordConfirm, {
  path: ["passwordConfirm"],
  message: "Passwords do not match",
});

export type RegisterInput = TypeOf<typeof registerSchema>;

const RegisterPage = () => {
  const store = useStore();

  const methods = useForm<RegisterInput>({
    resolver: zodResolver(registerSchema),
  });

  const {
    mutate: registerUser,
    data,
    isSuccess,
  } = useMutation((userData: RegisterInput) => signUpUserFn(userData), {
    onMutate(variables) {
      store.setRequestLoading(true);
    },
    onSuccess(data) {
      store.setRequestLoading(false);
      toast.success(data?.message);
    },
    onError(error: any) {
      store.setRequestLoading(false);
      if (Array.isArray((error as any).response.data.error)) {
        (error as any).response.data.error.forEach((err: any) => {
          toast.error(err.message, {
            position: "top-right",
          });
        });
      } else {
        toast.error((error as any).response.data.message, {
          position: "top-right",
        });
      }
    },
  });

  const {
    reset,
    handleSubmit,
    formState: { isSubmitSuccessful },
  } = methods;

  useEffect(() => {
    if (isSubmitSuccessful) {
      reset();
    }
  }, [isSubmitSuccessful]);

  const onSubmitHandler: SubmitHandler<RegisterInput> = (values) => {
    registerUser(values);
  };

  return (
    <section className="py-8 bg-ct-blue-600 min-h-screen grid place-items-center">
      {data && isSuccess ? (
        <Message>
          <p className="text-xl">{data.message}</p>
          <p className="mt-8">
            Already confirmed? Then you can{" "}
            <Link to="/login" className="text-blue-700 underline">
              Log in
            </Link>
          </p>
        </Message>
      ) : (
        <div className="w-full">
          <h1 className="text-4xl xl:text-6xl text-center font-[600] text-ct-yellow-600 mb-4">
            Welcome to CodevoWeb!
          </h1>
          <h2 className="text-lg text-center mb-4 text-ct-dark-200">
            Sign Up To Get Started!
          </h2>
          <FormProvider {...methods}>
            <form
              onSubmit={handleSubmit(onSubmitHandler)}
              className="max-w-md w-full mx-auto overflow-hidden shadow-lg bg-ct-dark-200 rounded-2xl p-8 space-y-5"
            >
              <FormInput label="Full Name" name="name" />
              <FormInput label="Email" name="email" type="email" />
              <FormInput label="Password" name="password" type="password" />
              <FormInput
                label="Confirm Password"
                name="passwordConfirm"
                type="password"
              />
              <span className="block">
                Already have an account?{" "}
                <Link to="/login" className="text-ct-blue-600">
                  Login Here
                </Link>
              </span>
              <LoadingButton
                loading={store.requestLoading}
                textColor="text-ct-blue-600"
              >
                Sign Up
              </LoadingButton>
            </form>
          </FormProvider>
        </div>
      )}
    </section>
  );
};

export default RegisterPage;
