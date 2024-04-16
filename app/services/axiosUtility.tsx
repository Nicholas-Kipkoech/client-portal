import axios from "axios";
import { API_URL } from "../constants/database-connect";

export const PrivateAxiosUtility = axios.create({
  baseURL: `${API_URL}`,
  timeout: 600000,
  headers: {
    "Content-Type": "application/json",
  },
});

export const AxiosUtility = axios.create({
  baseURL: `${API_URL}`,
  timeout: 600000,
  headers: {
    "Content-Type": "application/json",
  },
});

PrivateAxiosUtility.interceptors.request.use((req: any) => {
  if (typeof window !== "undefined") {
    const state = localStorage?.getItem("access_token");
    let token;
    if (state) {
      token = state;
      req.headers.Authorization = `Bearer ${token}`;
    }
    req.headers.Authorization = `Bearer ${token}`;
    return req;
  }
});

export default AxiosUtility;
