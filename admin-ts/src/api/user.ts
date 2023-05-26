import { IUserForm } from '@/typings/user'
import { httpGet, httpPost } from '.'
import { IResponse } from '@/typings/axios'


export function login(data: IUserForm): Promise<IResponse> {
    return new Promise((resolve, reject) => {
        httpPost(
            {
                url: '/user/login',
                data
            }
        ).then((res) => [
            resolve(res)
        ]).catch(err => {
            reject(err)
        })
    })
}

export function getUserRoutes(userId:string):Promise<IResponse>{
    return new Promise((resolve, reject) => {
        httpGet(
            {
                url: '/user/getRoutes',
                params:{
                    userId
                }
            }
        ).then((res) => [
            resolve(res)
        ]).catch(err => {
            reject(err)
        })
    })
}

