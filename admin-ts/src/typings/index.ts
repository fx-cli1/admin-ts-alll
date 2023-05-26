import { Commit, Dispatch } from "vuex";

export interface IMenu{
    id:number;
    path:string;
    title:string;
    icon?:string;
    children?:Array<IMenu>
}
export interface ISyncRoute {
    id:number;
    path:string;
    title:string;
    icon?:string;
    pid?:number;
    component:string;
    children?:Array<ISyncRoute>;
}
export interface IState{
    menu_route:Array<IMenu>,
    routeMap:Array<ISyncRoute>
    buttonList:Array<IButtonMenu>,
    activePath:string
}

export interface IStore{
    commit:Commit,
    state:IState,
    dispatch:Dispatch
}
export interface IButtonMenu{
    path:string,
    title:string
}