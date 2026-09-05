import axios from "axios";
import { API_URL } from "../utils/constants";
import { clearAuthStorage, getStorage } from "../utils/storage";

const api = axios.create({
  baseURL: API_URL,
});

api.interceptors.request.use((config) => {
  const token = getStorage("token");
  if (token) config.headers.Authorization = `Bearer ${token}`;
  // Let axios set multipart/form-data (with boundary) for uploads.
  if (typeof FormData !== "undefined" && config.data instanceof FormData) {
    delete config.headers["Content-Type"];
  }
  return config;
});

let redirecting = false;

api.interceptors.response.use(
  (response) => response,
  (error) => {
    const status = error?.response?.status;
    if (status === 401 && !redirecting && !window.location.pathname.includes("/admin/login")) {
      redirecting = true;
      clearAuthStorage();
      window.location.assign("/admin/login");
      setTimeout(() => {
        redirecting = false;
      }, 1200);
    }
    return Promise.reject(error);
  }
);

/** Readable message out of any axios error. */
export function getApiError(error, fallback = "Something went wrong.") {
  const data = error?.response?.data;
  if (!data) return fallback;
  if (typeof data.message === "string" && data.message) return data.message;
  if (Array.isArray(data.details) && data.details.length) {
    return data.details.map((d) => d.message || d.field).join(", ");
  }
  return fallback;
}

export default api;
