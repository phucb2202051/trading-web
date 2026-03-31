// src/core/api.js
import axios from "axios";
import { getToken } from "./token";

const api = axios.create({
//   baseURL: "https://happened-mpeg-reprints-productions.trycloudflare.com",
  baseURL: "http://localhost:8055",
  headers: {
    "Content-Type": "application/json",
  },
});

api.interceptors.request.use((config) => {
  const token = getToken();

  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }

  return config;
});

export default api;