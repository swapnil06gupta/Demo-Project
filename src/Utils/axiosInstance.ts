// utils/axiosInstance.ts
import axios from "axios";

// Dynamically set the base URL based on environment
const apiUrl = process.env.NEXT_PUBLIC_API_URL;

if (!apiUrl) {
  console.error("API URL is not defined in environment variables.");
}

const axiosInstance = axios.create({
  baseURL: apiUrl, // Automatically use this base URL in all requests
});

export default axiosInstance;
