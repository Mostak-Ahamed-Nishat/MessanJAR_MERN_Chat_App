import axios from "axios";
import {
    getAuthToken
} from "../../lib/getAuthToken";

const axiosInstance = axios.create({
    baseURL: "http://localhost:3001/api",
    withCredentials: true,
});


axiosInstance.interceptors.request.use(
    async (config) => {
            const token = await getAuthToken('authToken'); // a function to retrieve the token
            if (token) {
                config.headers.Authorization = `Bearer ${token}`;
            }
            return config;
        },
        (error) => {
            // console.log("Bearer authentication error");
            return Promise.reject(error);
        }
);



export default axiosInstance;