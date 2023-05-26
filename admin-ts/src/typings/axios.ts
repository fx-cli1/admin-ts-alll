import { AxiosHeaders } from "axios";

export interface IHttp<T>{
    url:string,
    data?:T,
    params?:T,
    headers?:AxiosHeaders
}

export interface IResponse{
    code:number;
    message:string;
    result:any;
}