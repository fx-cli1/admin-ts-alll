import { createStore } from 'vuex'
import getters from './getters'
import user from './module/user'
import { IMenu, ISyncRoute, IState, IStore, IButtonMenu } from '@/typings'
import { getStorage } from '@/utils'
import { staticRouteMap } from '@/router'
import { getUserRoutes } from '@/api/user'
import { IResponse } from '@/typings/axios'
import { initSyncRoute, initMenuRoute } from '@/utils/routes'
const mutations = {
    INIT_ROUTE_MAP(state: IState, routeMap: ISyncRoute[]) {
        state.routeMap = routeMap;
    },
    SET_MENU_ROUTE(state: IState, menuRoute: IMenu[]) {
        state.menu_route = menuRoute
    },
    REMOVE_ROUTEMAP(state: IState) {
        state.routeMap = [];
    },
    PUSH_BUTTON_LIST(state: IState, buttonMenu: IButtonMenu) {
        let menuIndex = state.buttonList.findIndex(btnMenu => btnMenu.path === buttonMenu.path);
        if (menuIndex > -1) {//如果有就清除
            state.buttonList.splice(menuIndex, 1);
        }
        state.buttonList.push(buttonMenu)
    },
    REMOVE_BUTTON_LIST(state: IState, path: string) {
        state.buttonList = state.buttonList.filter(item => item.path !== path);
    },
    SET_ACTIVE_PATH(state: IState, path: string) {
        state.activePath = path
    }
}
const actions = {
    getUserRoute({ commit }: IStore) {//请求路由表生产路由和menu
        return new Promise((resolve, reject) => {
            let userId = getStorage('userInfo', 'Session').userId as string;
            getUserRoutes(userId).then((res: IResponse) => {
                let { code, result } = res;
                if (code === 200 && result) {
                    let routeMap: ISyncRoute[] = result;
                    commit("INIT_ROUTE_MAP", routeMap)
                    commit("SET_MENU_ROUTE", initMenuRoute(routeMap, staticRouteMap))
                    let asyncRoutes = initSyncRoute(routeMap)
                    resolve(asyncRoutes);
                }
            })
        })
    }
}

const store = createStore<IState>({
    state: {
        buttonList: [],
        menu_route: [],
        routeMap: [], //第一次请求返回的路由表
        activePath: '/home'
    },
    getters,
    mutations,
    actions,
    modules: {
        user
    }
})

export default store;
