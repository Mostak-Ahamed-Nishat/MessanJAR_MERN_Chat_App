import axios from "axios";
import {
    getAuthToken
} from "../../lib/getAuthToken";



const axiosInstance = axios.create({
    baseUrl: "http://localhost:3000/api/",
    withCredentials: true,
});

axiosInstance.interceptors.request.use(
    (config) => {
        const token = getAuthToken('authToken'); // Implement a function to retrieve the token
        if (token) {
            config.headers['Authorization'] = `Bearer ${token}`;
        }
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);



export default axiosInstance;