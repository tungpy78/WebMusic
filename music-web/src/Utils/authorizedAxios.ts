import axios from "axios";
import { toast } from "react-toastify";

const API_DOMAIN = "http://localhost:5000/";

let authorizedAxiosInstance = axios.create({
    baseURL: API_DOMAIN,
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
    },
  });

authorizedAxiosInstance.defaults.timeout = 1000 * 60 * 10; // 10 minutes

// Add a request interceptor
authorizedAxiosInstance.interceptors.request.use((config) => {
    // Do something before request is sent
    return config;
  },(error) => {
    // Do something with request error
    return Promise.reject(error);
  });

// Add a response interceptor
authorizedAxiosInstance.interceptors.response.use((response) => {
    // Any status code that lie within the range of 2xx cause this function to trigger
    // Do something with response data
    return response;
  },(error) => {
    // Any status codes that falls outside the range of 2xx cause this function to trigger
    // Do something with response error
    if (error.response.status !== 410) {
      toast.error(error.response.data.message || error.message);
    }

    return Promise.reject(error);
  });

  // Các hàm gọi API
  export const get = async (path: string) => {
    const response = await authorizedAxiosInstance.get(path);
    return response.data;
  };
  
  export const post = async (path: string, data: Object) => {
    const response = await authorizedAxiosInstance.post(path, data);
    return response.data;
  };
  
  export const del = async (path: string) => {
    const response = await authorizedAxiosInstance.delete(path);
    return response.data;
  };
  
  export const patch = async (path: string, data: Object) => {
    const response = await authorizedAxiosInstance.patch(path, data);
    return response.data;
  };
  

export default authorizedAxiosInstance;