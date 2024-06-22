// src/utils.ts
import { AxiosClientOptions } from "#/types";
import axios, { AxiosInstance } from "axios";

export const getAxiosClient = (apiKey: string, options: AxiosClientOptions | null): AxiosInstance => {
  return axios.create({
    baseURL: options?.baseURL || "https://api.yourdomain.com",
    timeout: options?.timeout || 10000,
    headers: {
      ...options?.headers,
      Authorization: `Bearer ${apiKey}`,
    },
  });
};
