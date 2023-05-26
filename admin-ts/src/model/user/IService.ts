import { AxiosPromise } from 'axios';
import userInfo from './index';
export default interface IService {
    login(data: userInfo): AxiosPromise,
    query(): AxiosPromise
}