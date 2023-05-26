import { getStorage, removeStorage, setStorage } from ".";

export function getToken():string {
    return getStorage('token','Session');
}

export function setToken(token: string) {
    setStorage('token', token, 'Session');
}

export function removeToken() {
    removeStorage('token', 'Session')
}