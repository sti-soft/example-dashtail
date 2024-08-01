import axios from "axios";
import {useAuthStore} from "@/store";

const appApi = axios.create({
    baseURL: process.env.NEXT_PUBLIC_BACKEND_URL
});

appApi.interceptors.request.use(config => {
    const token = useAuthStore.getState().token
    if (token) {
        config.headers['Authorization'] = `Bearer ${token}`
    }

    return config;
})

export { appApi };