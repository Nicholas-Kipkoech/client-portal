import { Imotor } from "../types";
import { PrivateAxiosUtility } from "./axiosUtility";

export const requestMotorQuote = async (data: Imotor) => {
  const res = await PrivateAxiosUtility.post(`/request/motor`, data);
  return res.data;
};
