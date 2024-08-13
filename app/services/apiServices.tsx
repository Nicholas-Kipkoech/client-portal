import { Imotor } from '../types'
import { PrivateAxiosUtility } from './axiosUtility'

export const requestMotorQuote = async (data: Imotor) => {
  const res = await PrivateAxiosUtility.post(`/request/motor`, data)
  return res.data
}

export const createPolicy = async (data: any) => {
  const res = await PrivateAxiosUtility.post(`/request/motor/policy`, data)
  return res.data
}

export const userLogin = async (data: any) => {
  const res = await PrivateAxiosUtility.post(`/user/user-login`, data)
  return res.data
}

export const userRegister = async (data: any) => {
  const res = await PrivateAxiosUtility.post(`/user/register`, data)
  return res.data
}

export const getPolicies = async (data: any) => {
  const res = await PrivateAxiosUtility.post(`/policies/fetch`, data)
  return res.data
}
export const getProducts = async () => {
  const res = await PrivateAxiosUtility.post(`/policies/fetch/products`)
  return res.data
}
export const getClaims = async (data: any) => {
  const res = await PrivateAxiosUtility.post(`/claims/fetch`, data)
  return res.data
}
export const getPremiumsAndCommission = async (data: any) => {
  const res = await PrivateAxiosUtility.post(`/premiums/fetch`, data)
  return res.data
}
export const getReceiptsData = async (data: any) => {
  const res = await PrivateAxiosUtility.post(`/ARreceipts/fetch`, data)
  return res.data
}
export const getPremiumReports = async (data: any) => {
  const res = await PrivateAxiosUtility.post(`/premiumReports/fetch`, data)
  return res.data
}
export const getClaimCreditNotes = async (data: any) => {
  const res = await PrivateAxiosUtility.post(`/claimCreditNotes/fetch`, data)
  return res.data
}
export const getReceipts = async (data: any) => {
  const res = await PrivateAxiosUtility.post(`/receipts/fetch`, data)
  return res.data
}
export const getClaimDebits = async (data: any) => {
  const res = await PrivateAxiosUtility.post(`/claimDebits/fetch`, data)
  return res.data
}
export const getCommissionPayable = async (data: any) => {
  const res = await PrivateAxiosUtility.post(`/commissionPayble/fetch`, data)
  return res.data
}
export const getGLStatements = async (data: any) => {
  const res = await PrivateAxiosUtility.post(`/glStatements/fetch`, data)
  return res.data
}
export const getUpcomingRenewals = async (data: any) => {
  const res = await PrivateAxiosUtility.post(`/upcomingRenewals/fetch`, data)
  return res.data
}
export const getExpectedRenewals = async (data: any) => {
  const res = await PrivateAxiosUtility.post(`/expectedRenewals/fetch`, data)
  return res.data
}

export const getTravelCertificatesService = async (data: any) => {
  const res = await PrivateAxiosUtility.post(`/travel/travel-certs`, data)
  return res.data
}

export const getUserRoles = async (data: any) => {
  const res = await PrivateAxiosUtility.post(`/user/user-roles`, data)
  return res.data
}
