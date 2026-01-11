import axios from "axios";


const API_PATH = import.meta.env.VITE_API_PATH;

const api = axios.create({
  baseURL: "https://ec-course-api.hexschool.io/v2",
});

// =====================
// Request Interceptor
// =====================
api.interceptors.request.use(
  (config) => {
    // 從 cookie 讀 token
    const token = document.cookie
      .split("; ")
      .find((row) => row.startsWith("PAPAYA_KG_TOKEN="))
      ?.split("=")[1];
    // 修改實體建立時所指派的預設配置
    if (token) {
      config.headers.Authorization = token;
    }

    return config;
  },
  (error) => Promise.reject(error)
);

// =====================
// API methods
// =====================
//登入API
api.login = (payload) => api.post("/admin/signin", payload);
//驗證登入API
api.checkLogin = () => api.post("/api/user/check");
//取得產品API
api.getProducts = () => {
  return api.get(`/api/${API_PATH}/admin/products`);

}

export default api;
