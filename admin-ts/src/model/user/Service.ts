import axios from '../../utils/request';
import { AxiosPromise } from 'axios';
import IService from './IService'
import userInfo from './index'




class Service implements IService {
    login(data: userInfo): AxiosPromise {
        return axios({
            method: 'post',
            url: '/api/user/login',
            data
        })
    }
    query(): AxiosPromise {
        return axios({
            method: 'get',
            url: '/api/user/userinfo',
        })
    }
}


export default new Service();