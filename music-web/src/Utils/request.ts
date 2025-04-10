import axios from "axios";

const API_DOMAIN = "http://localhost:3001/";

// Lấy token từ localStorage (hoặc nơi khác tuỳ bạn)
const getToken = () => {
  return localStorage.getItem("accessToken"); // sửa theo key của bạn
};

// Tạo một instance của Axios
const axiosInstance = axios.create({
  baseURL: API_DOMAIN,
  headers: {
    "Content-Type": "application/json",
    Accept: "application/json",
  },
});

// Interceptor để thêm token vào headers nếu có
axiosInstance.interceptors.request.use(
  (config) => {
    const token = getToken();
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// Các hàm gọi API
export const get = async (path: string) => {
  const response = await axiosInstance.get(path);
  return response.data;
};

export const post = async (path: string, data: Object) => {
  const response = await axiosInstance.post(path, data);
  return response.data;
};

export const del = async (path: string) => {
  const response = await axiosInstance.delete(path);
  return response.data;
};

export const patch = async (path: string, data: Object) => {
  const response = await axiosInstance.patch(path, data);
  return response.data;
};
