import axios from "axios";

const http = axios.create({
  baseURL: process.env.VUE_APP_API_BASE_URL || "http://localhost:8091",
  headers: {
    "Content-Type": "application/json",
  },
});

// Interceptores para manejo de errores o configuraciones globales
http.interceptors.response.use(
  (response) => response,
  (error) => {
    // Manejo global de errores
    console.error(error.response?.data || "Error desconocido");
    return Promise.reject(error);
  }
);

export default http;
