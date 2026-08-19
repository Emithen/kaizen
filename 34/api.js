import { STORAGE_KEY } from "./mock.js";

export const getPosts = async () => {
    const res = await fetch("http://localhost:3000/posts");
    return res.json();
}

export const savePosts = (posts) => {
    console.log("save", posts);
    return new Promise((resolve) => {
        setTimeout(() => {
            localStorage.setItem(STORAGE_KEY, JSON.stringify(posts));
            resolve(null);
        }, 500)
    });
}
