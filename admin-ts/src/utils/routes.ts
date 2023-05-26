import { IMenu, ISyncRoute } from "@/typings";
import { RouteRecordRaw } from "vue-router";
import { JSONCopy } from ".";
import Layout from '@/Layout/index.vue'
let whiteRoute = ['/login']
let modules = import.meta.glob('../views/**/*.vue')
export function initMenuRoute(routeMap: ISyncRoute[], staticRouteMap: Array<RouteRecordRaw>) {
    let newParents: IMenu[] = [];
    if (routeMap?.length) {
        let { parents, children } = rootAndChild(routeMap);
        parents = JSONCopy<ISyncRoute[]>(parents)
        children = JSONCopy<ISyncRoute[]>(children)
        dataToTree(parents, children)
        newParents = parents.map((parent: IMenu) => {
            return {
                id: parent.id,
                path: parent.path,
                icon: parent.icon,
                title: parent.title,
                children: menuChild(parent, parent.path)
            }
        })
    }


    return [...staticRouteToMenu(staticRouteMap, ''), ...newParents]
    function menuChild(parent: IMenu, path: string): IMenu[] {
        let children: IMenu[] = [];
        parent.children?.forEach((child: IMenu) => {
            if (child.children && child.children.length) {
                children.push({
                    id: child.id,
                    path: path + child.path,
                    icon: child.icon,
                    title: child.title,
                    children: menuChild(child, path + child.path)
                })
            } else {
                children.push({
                    id: child.id,
                    path: path + child.path,
                    icon: child.icon,
                    title: child.title,
                })
            }
        })
        return children;
    }
    function staticRouteToMenu(staticRouteMap: Array<RouteRecordRaw>, path: string) {
        let staticRoutes: IMenu[] = [];
        for (let i = 0; i < staticRouteMap.length; i++) {
            let route = staticRouteMap[i];
            if (!whiteRoute.includes(route.path)) {
                if (route.children && route.children.length>1) {
                    staticRoutes.push({
                        id: routeMap.length + i,
                        path: path + route.path,
                        title: route.meta?.title as string,
                        icon: route.meta?.icon as string,
                        children: staticRouteToMenu(route.children, route.path)
                    })
                } else {
                    staticRoutes.push({
                        id: routeMap.length + i,
                        path: path + route.path,
                        title: route.meta?.title as string,
                        icon: route.meta?.icon as string,
                    })
                }
            }
        }
        return staticRoutes
    }
}
export function initSyncRoute(routeMap: ISyncRoute[]) {
    const routes = [...RoutePlaneToTree(routeMap)]
    return routes.map((route: ISyncRoute) => {
        if (route.children?.length) {
            return {
                path: route.path,
                name: route.path?.substring(1),
                component: Layout,
                children: routeChild(route, route.path)
            }
        } else {
            return {
                path: route.path,
                name: route.path?.substring(1),
                component: Layout,
                children: [
                    {
                        path: '', component: modules[`../views/${route.component}.vue`]
                    }
                ]
            }
        }

    })
    // s
    function routeChild(route: ISyncRoute, path: string) {
        let children: RouteRecordRaw[] = [];
        route.children?.forEach((item: ISyncRoute) => {
            if (item.children?.length) {
                children.push({
                    path: item.path?.substring(1),
                    component: modules[`../views${path}/${item.component}.vue`],
                    meta: {
                        title: item.title,
                        icon: item.icon
                    },
                    children: routeChild(item, path)
                })
            } else {
                children.push({
                    path: item.path?.substring(1),
                    component: modules[`../views${path}/${item.component}.vue`],
                    meta: {
                        title: item.title,
                        icon: item.icon
                    }
                })
            }
        })
        return children;
    }
}
function RoutePlaneToTree(routeMap: ISyncRoute[]): ISyncRoute[] {
    let { parents, children } = rootAndChild(routeMap)
    dataToTree(parents, children)
    return parents
}
function dataToTree(parents: ISyncRoute[], children: ISyncRoute[]) {
    parents.map((parent: ISyncRoute) => {
        children.map((child: ISyncRoute, index: number) => {
            if (parent.id === child.pid) {
                let _children = JSONCopy<ISyncRoute[]>(children);
                _children.splice(index, 1);
                dataToTree([child], _children)
                if (parent.children) {
                    parent.children.push(child)
                } else {
                    parent.children = [child]
                }
            }
        })
    })
}
function rootAndChild(routeMap: ISyncRoute[]) {
    let parents = routeMap.filter((route: ISyncRoute) => !route.pid && route.pid !== 0),
        children = routeMap.filter((route: ISyncRoute) => route.pid || route.pid === 0);

    return {
        parents,
        children
    }
}