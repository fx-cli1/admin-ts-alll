
export function getWindowWidth(): number {
   return window.innerWidth;
}
export enum EStorage {
   LOCAL = "Local",
   SESSION = "Session"
}
export function getStorage(key: string, type?: "Local" | "Session") {
   type = type ? type : EStorage.LOCAL
   let res;
   switch (type) {
      case EStorage.LOCAL:
         res = window["localStorage"].getItem(key);
         break;
      case EStorage.SESSION:
         res = window["sessionStorage"].getItem(key);
         break;
      default:
         break;
   }
   return res ? JSON.parse(res) : '';
}
export function setStorage(key: string, value: any, type?: "Local" | "Session") {
   type = type ? type : EStorage.LOCAL
   switch (type) {
      case EStorage.LOCAL:
         window["localStorage"].setItem(key, JSON.stringify(value));
         break;
      case EStorage.SESSION:
         window["sessionStorage"].setItem(key, JSON.stringify(value));
         break;
      default:
         break;
   }
}

export function removeStorage(key: string, type?: "Local" | "Session") {
   type = type ? type : EStorage.LOCAL
   switch (type) {
      case EStorage.LOCAL:
         window["localStorage"].removeItem(key);
         break;
      case EStorage.SESSION:
         window["sessionStorage"].removeItem(key);
         break;
      default:
         break;
   }
}

export function JSONCopy<T>(value: T): T {
   return JSON.parse(JSON.stringify(value))
}


export function requireUrl(url: string) {
   return new URL(url, import.meta.url).href
}