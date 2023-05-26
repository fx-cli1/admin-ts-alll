import axios, { AxiosResponse, InternalAxiosRequestConfig } from "axios";
import { getToken } from "./auth";
import { ElMessage } from "element-plus";
import store from "@/store";



const request = axios.create({
    baseURL: 'http://localhost:3000',
    timeout: 10000,
});

request.interceptors.request.use((config: InternalAxiosRequestConfig) => {
    // console.log(config,'config')
    config.headers.token = getToken();
    return config;
}, (err: Error) => Promise.reject(err))

request.interceptors.response.use((res: AxiosResponse) => {
    let { data } = res
    switch (data.code) {
        case 401:
            console.log('errr')
            ElMessage({
                message:'用户验证失败，请重新登录',
                duration:3000,
                type: 'error',
            })
            store.commit('user/REMOVE_TOKEN')
                window.location.reload()
            break;
        default:
            break;
    }
    return data;
}, (err: Error) => Promise.reject(err))


export default request;