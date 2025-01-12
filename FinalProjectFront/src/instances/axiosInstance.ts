import axios from "axios";
import { toast } from "react-toastify";

const axiosInstance = axios.create({
  baseURL: "http://localhost:5000/api", // Your API base URL
});

axiosInstance.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    if (axios.isAxiosError(error)) {
      if (error.response?.status === 401 && !originalRequest._retry) {
        originalRequest._retry = true;

        try {
          const refreshResponse = await axios.post(
            "http://localhost:5000/api/auth/refresh",
            {},
            { withCredentials: true } // Ensure cookies are sent
          );

          // Update token and retry original request
          const newToken = refreshResponse.data.token;
          localStorage.setItem("authToken", newToken);
          axiosInstance.defaults.headers.common[
            "Authorization"
          ] = `Bearer ${newToken}`;
          originalRequest.headers["Authorization"] = `Bearer ${newToken}`;

          return axiosInstance(originalRequest); // Retry the original request
        } catch {
          toast.error("Session expired. Please log in again.");
          localStorage.removeItem("authToken"); // Clear token
          window.location.href = "/login"; // Redirect to login
        }
      }

      if (error.response?.status === 403) {
        toast.error("Token invalid. Redirecting to login...");
        localStorage.removeItem("authToken");
        window.location.href = "/login";
      }
    }

    return Promise.reject(error);
  }
);

export default axiosInstance;
