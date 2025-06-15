import axios from "axios";
import { toast } from "react-toastify";

const API_DOMAIN = "https://music-web-bevip.onrender.com";

let authorizedAxiosInstance = axios.create({
    baseURL: API_DOMAIN,
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
      'Cache-Control': 'no-cache'

    },
  });

authorizedAxiosInstance.defaults.timeout = 1000 * 60 * 10; // 10 minutes
// authorizedAxiosInstance.defaults.withCredentials = true; // Send cookies with requests

// Các hàm gọi API
export const get = async (path: string) => {
  const response = await authorizedAxiosInstance.get(path);
  return response;
};

export const post = async (path: string, data: Object) => {
  const response = await authorizedAxiosInstance.post(path, data);
  return response;
};
export const put = async (path: string, data: Object) => {
  const response = await authorizedAxiosInstance.put(path, data);
  return response;
};

export const del = async (path: string) => {
  const response = await authorizedAxiosInstance.delete(path);
  return response;
};

export const patch = async (path: string, data: Object) => {
  const response = await authorizedAxiosInstance.patch(path, data);
  return response;
};


// Add a request interceptor
authorizedAxiosInstance.interceptors.request.use((config) => {
    // Do something before request is sent
    const accessToken = localStorage.getItem("accessToken");
    if (accessToken) {
      config.headers.Authorization = `Bearer ${accessToken}`;
    }


 
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
    console.log("error", error);
    //Nếu như nhận được lỗi 401 thì sẽ xóa token và chuyển về trang login
    if (error.response?.status === 401) 
      {
        console.log("error", error.response.data.message);
        localStorage.removeItem("accessToken");
        localStorage.removeItem("refreshToken");
        localStorage.removeItem("user");
        toast.error("Phiên đăng nhập đã hết hạn, vui lòng đăng nhập lại!");
      
        window.location.href = "/login";
    }

    //Nếu như nhận được lỗi 410 thì gọi api refresh token
    const originalRequest = error.config;
    if (error.response?.status === 410 && !originalRequest._retry) {

      originalRequest._retry = true;

      const refreshToken = localStorage.getItem("refreshToken");
      console.log("refreshToken410", refreshToken);
      return authorizedAxiosInstance.put(`${API_DOMAIN}auth/refresh-token`, { refreshToken })
        .then((res) => {
        const accessToken = res.data.accessToken ;
          console.log("res410", res.data);
          console.log("accessToken410", accessToken);
          localStorage.setItem("accessToken", accessToken);

          authorizedAxiosInstance.defaults.headers.Authorization = `Bearer ${accessToken}`;
          

          return authorizedAxiosInstance(originalRequest);
        })
        .catch((_error) => {
          console.log("Lỗi retry:", _error.response?.data);
          localStorage.removeItem("accessToken");
          localStorage.removeItem("refreshToken");
          localStorage.removeItem("user");
          toast.error("Phiên đăng nhập đã hết hạn, vui lòng đăng nhập lại!");
          window.location.href = "/login";
          return Promise.reject(_error);
        });
    }

    if (error.response.status !== 410) {
      console.log("error", error.response.data.message);
      toast.error(error.response.data.message || error.message);
      
    }

    return Promise.reject(error);
  });


export default authorizedAxiosInstance;