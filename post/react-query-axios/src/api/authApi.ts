import axios from "axios";
import { GenericResponse, ILoginResponse, IUserResponse } from "./types";

const BASE_URL = "http://localhost:8000/api/";

export const authApi = axios.create({
  baseURL: BASE_URL,
  withCredentials: true,
});

authApi.defaults.headers.common["Content-Type"] = "application/json";

export const signUpUserFn = async (user) => {
  const response = await authApi.post<GenericResponse>("auth/register", user);
  return response.data;
};

export const LoginUserFn = async (user) => {
  const response = await authApi.post<ILoginResponse>("auth/login", user);
  return response.data;
};

export const verifyEmailFn = async (verificationCode: string) => {
  const response = await authApi.get<GenericResponse>(
    `auth/verifyemail/${verificationCode}`
  );
  return response.data;
};

export const LogoutUserFn = async () => {
  const response = await authApi.get<GenericResponse>("auth/logout");
  return response.data;
};

export const getMeFn = async () => {
  const response = await authApi.get<IUserResponse>("users/me");
  return response.data;
};
