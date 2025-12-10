import axios from "axios";

const api = axios.create({
  baseURL: "https://api.example.com", // nanti diganti backend sebenarnya
  timeout: 10000,
});

// attach token from sessionStorage if exists
api.interceptors.request.use((config) => {
  const token = sessionStorage.getItem("auth_token");
  if (token) config.headers.Authorization = `Bearer ${token}`;
  return config;
});

export default api;
