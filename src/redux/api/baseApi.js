import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const api = createApi({
  reducerPath: "api",
  baseQuery: fetchBaseQuery({ baseUrl: "http://10.10.7.46:5003/api/v1" }),
  prepareHeaders: (headers) => {
    const token = localStorage.getItem("accessToken");
    console.log("Token from localStorage:", token);
    if (token) {
      headers.set("Authorization", `Bearer ${token}`);
    }
    return headers;
  },
  tagTypes: ["Auth"],
  endpoints: () => ({}),
});

export const imageUrl = "http://10.10.7.46:5003";
