import axios from "axios";

// Create axios instance
const api = axios.create({
  baseURL: "http://localhost:5000/api", // keep base api
  withCredentials: false,
  headers: {
    "Content-Type": "application/json",
  },
});

// Request interceptor (Attach token automatically)
api.interceptors.request.use(
  (config) => {
    try {
      const token = localStorage.getItem("token");

      // Ensure headers object exists
      if (!config.headers) {
        config.headers = {};
      }

      // Attach Authorization header if token exists
      if (token && token !== "null" && token !== "undefined") {
        config.headers.Authorization = `Bearer ${token}`;
      }

      return config;
    } catch (error) {
      console.error("Axios Request Interceptor Error:", error);
      return config;
    }
  },
  (error) => {
    return Promise.reject(error);
  },
);

// Response interceptor (optional future handling)
api.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    // Handle unauthorized globally
    if (error.response && error.response.status === 401) {
      console.warn("Unauthorized request. Token may be missing or expired.");

      // Optional: redirect to login if token expired
      // localStorage.removeItem("token");
      // window.location.href = "/login";
    }

    return Promise.reject(error);
  },
);

export default api;
