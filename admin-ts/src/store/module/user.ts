import { IStore } from '@/typings'
import { IUserForm, IUserInfo, IUserState } from '@/typings/user'
import { getToken, removeToken, setToken } from '@/utils/auth'
import { login } from '@/api/user'
import { IResponse } from '@/typings/axios'
import { ElMessage } from 'element-plus'
import { getStorage, setStorage } from '@/utils'
const state = {
    token: getToken(),
    userInfo: getStorage('userInfo', 'Session')
}

const mutations = {
    SET_TOKEN(state: IUserState, token: string) {
        state.token = token
    },
    SET_USERINFO(state: IUserState, userInfo: IUserInfo) {
        state.userInfo = userInfo;
    },
    REMOVE_TOKEN(state: IUserState) {
        state.token = '';
        removeToken();
    }
}


const actions = {
    login({ commit }: IStore, userInfo: IUserForm) {
        return new Promise((resolve, reject) => {
            //这里调用登录的接口，快写
            login(userInfo).then((res: IResponse) => {
                let { code, message, result } = res;
                if (code === 200) {
                    ElMessage({
                        message,
                        type: 'success',
                    })
                    let userInfo = { userName: result.userName, permissionRole: result.permissionRole, userId: result.userId, userImg: result.userImg }
                    setToken(result.token);
                    setStorage('userInfo', userInfo, 'Session')
                    commit("SET_TOKEN", result.token)//
                    commit("SET_USERINFO", userInfo)
                    resolve('ok')
                } else if (code === 400) {
                    ElMessage({
                        message,
                        type: 'error',
                    })
                    reject('err')
                }
            }).catch(e => {
                reject(false)
            })
            // let token = 'admin'
            // setToken(token)
            // commit("SET_TOKEN", token)
            // resolve(true)
        })
    }
}
const getters = {

}







export default {
    namespaced: true,
    state,
    getters,
    mutations,
    actions
}
