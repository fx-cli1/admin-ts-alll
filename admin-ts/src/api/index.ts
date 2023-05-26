import { IHttp, IResponse } from "@/typings/axios"
import request from "@/utils/request"

export function httpPost<T>({ url, data, headers }: IHttp<T>):Promise<IResponse> {
    return new Promise((resolve, reject) => {
        request.post(url, data, { headers }).then((res) => {
            let result = res as unknown as IResponse
            resolve(result)
        }).catch(err => {
            reject(err)
        })
    })

}
export function httpGet<T>({ url, params, headers }: IHttp<T>):Promise<IResponse> {
    return new Promise((resolve, reject) => {
        request.get(url, { params, headers }).then((res) => {
            let result = res as unknown as IResponse
            resolve(result)
        }).catch(err => {
            reject(err)
        })
    })
}