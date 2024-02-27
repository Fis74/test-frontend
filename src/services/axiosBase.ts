import { BaseQueryFn } from "@reduxjs/toolkit/query";
import axios, { AxiosError, AxiosRequestConfig } from "axios";

export const axiosBaseQuery =
  ({
    baseUrl,
    method,
    headers,
  }: {
    baseUrl: string;
    method?: AxiosRequestConfig["method"];
    headers?: AxiosRequestConfig["headers"];
  }): BaseQueryFn<
    {
      data?: AxiosRequestConfig["data"];
      params?: AxiosRequestConfig["params"];
    },
    unknown,
    unknown
  > =>
  async ({ data }) => {
    try {
      const result = await axios({
        url: baseUrl,
        method,
        data,
        headers,
      });
      return { data: result.data };
    } catch (axiosError) {
      const err = axiosError as AxiosError;
      if (err.response) {
        console.log("Response:", err.response.data);
        console.log("Status:", err.response.status);
      }
      return {
        error: {
          status: err.response?.status,
          data: err.response?.data || err.message,
        },
      };
    }
  };
