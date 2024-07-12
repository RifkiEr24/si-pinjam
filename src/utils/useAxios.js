import axios from "axios";

//Create an axios instance for reusable configuration
export default function useAxios() {
    const axiosInstance = axios.create({
        baseURL: import.meta.env.VITE_API_URL + '/api/',
    });
    
    return axiosInstance;
}