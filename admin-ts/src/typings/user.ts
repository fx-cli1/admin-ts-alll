export interface IUserForm{
    userName:string;
    passWord:string;
}
export interface IUserInfo{
    userName:string;
    [key:string]:any;
}
export interface IUserState{
    token:string;
    userInfo:IUserInfo;
}

export interface ILoginInfo extends IUserForm{
    isChecked:boolean
}