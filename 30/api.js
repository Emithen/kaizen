import { STORAGE_KEY, POST_LIST } from "./mock.js";

export const getPosts = () => {
    return new Promise((resolve) => {
        setTimeout(() => {
            // 외부 네트워크 대신 local storage 에서 값을 가져옴
            const data = JSON.parse(localStorage.getItem(STORAGE_KEY)) ?? POST_LIST;
            resolve(data);
        }, 500) });
}