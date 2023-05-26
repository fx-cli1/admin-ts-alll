import { createRouter, createWebHashHistory, RouteRecordRaw } from 'vue-router'
import Layout from '@/Layout/index.vue'
import { getToken } from '@/utils/auth';
import store from '@/store';

export const staticRouteMap = [
    {
        path: '/login',
        name: 'Login',
        component: () => import('@/views/Login/index.vue')
    },
    {
        path: '/home',
        name: 'Home',
        component: Layout,
        meta: {
            title: '首页',
            icon: 'House'
        },
        children: [
            {
                path: '',
                component: () => import('@/views/Home/index.vue'),
                meta: {
                    title: 'index'
                }
            }
        ]
    },
];

/**
 * 
 * ### 课程管理
1.课程列表
### 信息管理模块
1.学生管理
2.教师管理
3.学院管理
### 系统管理
1.用户权限
2.模块管理
 * 
 */




const routes: Array<RouteRecordRaw> = [
    ...staticRouteMap
];
const router = createRouter({
    routes: staticRouteMap,
    history: createWebHashHistory()
})

router.beforeEach(async (to, from, next) => {//路由前置守卫
    // console.log(to, 'to');
    // console.log(from, 'from');
    // console.log(getToken())
    if (to.path === '/login') { //如果是去登录页直接放行
        next()
    } else {
        if (getToken()) { //有token 
            if (to.path === '/') { //有token 看看是不是去 / 如果是重定向到/home页面
                next('/home');
            } else {
                console.log(store.getters.isRoute,'isRoute')
                if (store.getters.isRoute) { // 判断当前是否路由表还在
                    next()
                } else {
                    try {
                        let asyncRouteMap = await store.dispatch('getUserRoute');
                        asyncRouteMap.forEach((route: RouteRecordRaw) => {
                            router.addRoute(route)
                        });
                        if (asyncRouteMap?.length) {
                            next({ ...to, replace: true })
                        } else {
                            next()
                        }
                    } catch (err) {

                    }
                    // console.log(router.getRoutes(), '查看现有路由')
                }
            }

        } else { //没有token 进入登录页
            next('/login')
        }
    }

})

export default router;