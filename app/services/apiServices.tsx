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

export const getPolicies = async (data: any) => {
  const res = await PrivateAxiosUtility.post(`/policies/fetch`, data);
  return res.data;
};
export const getClaims = async (data: any) => {
  const res = await PrivateAxiosUtility.post(`/claims/fetch`, data);
  return res.data;
};
export const getPremiumsAndCommission = async (data: any) => {
  const res = await PrivateAxiosUtility.post(`/premiums/fetch`, data);
  return res.data;
};
export const getReceiptsData = async (data: any) => {
  const res = await PrivateAxiosUtility.post(`/ARreceipts/fetch`, data);
  return res.data;
};
export const getPremiumReports = async (data: any) => {
  const res = await PrivateAxiosUtility.post(`/premiumReports/fetch`, data);
  return res.data;
};
export const getClaimCreditNotes = async (data: any) => {
  const res = await PrivateAxiosUtility.post(`/claimCreditNotes/fetch`, data);
  return res.data;
};
export const getReceipts = async (data: any) => {
  const res = await PrivateAxiosUtility.post(`/receipts/fetch`, data);
  return res.data;
};
