import axios from "axios";

const csrfToken = document.querySelector("[name=csrf-token]").getAttribute("content");
const axiosInstance = axios.create();

axiosInstance.interceptors.response.use(
    response => response,
    error => Promise.reject((error.response && error.response.data) || "Something went wrong")
);

axiosInstance.defaults.headers.common["X-Requested-With"] = "XMLHttpRequest";
axiosInstance.defaults.headers.common["X-CSRF-TOKEN"] = csrfToken;

export default axiosInstance;
