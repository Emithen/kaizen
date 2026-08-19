/**
 * TODO
 * api caller 반환 객체 고도화
 *  > 성공 여부, status 코드 등 추가적으로 필요한 정보 보존 목적
 */


const BASE_URL = "http://localhost:3000";

export const getPosts = async () => {
    const res = await fetch(
        BASE_URL + "/posts",
        { method: "GET" }
    );
    return res.json();
}

// post -> { id: ..., content: ... }
export const createPost = async (content) => {
    const res = await fetch(
        BASE_URL + "/posts",
        { 
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ content: content })
        }
    );
    return res.json();
}

export const deletePost = async (id) => {
    const res = await fetch(
        BASE_URL + "/posts/" + id,
        { method: "DELETE" }
    );
    return res.ok;
}
