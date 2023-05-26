import { IState } from "@/typings";

export default {
    isRoute: (state: IState) => state.routeMap?.length ? true : false,
    menuData: (state: IState) => state.menu_route,
    buttonList: (state: IState) => state.buttonList,
    activePath:(state:IState)=>state.activePath
}