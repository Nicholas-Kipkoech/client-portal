import { Imotor } from "../types";
import { PrivateAxiosUtility } from "./axiosUtility";

export const requestMotorQuote = async (data: Imotor) => {
  const res = await PrivateAxiosUtility.post(`/request/motor`, data);
  return res.data;
};

export const userLogin = async (data: any) => {
  const res = await PrivateAxiosUtility.post(`/user/login`, data);
  return res.data;
};
export const userRegister = async (data: any) => {
  const res = await PrivateAxiosUtility.post(`/user/register`, data);
  return res.data;
};
