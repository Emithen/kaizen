/**
 * TODO
 * api caller 반환 객체 고도화
 *  > 성공 여부, status 코드 등 추가적으로 필요한 정보 보존 목적
 */


const BASE_URL = "http://localhost:3000";

type Post = {
    id: string;
    content: string;
}

export const getPosts = async (): Promise<Post[]> => {
    const res = await fetch(
        BASE_URL + "/posts",
        { method: "GET" }
    );
    const data: unknown = await res.json();
    return data as Post[];
}

// post -> { id: ..., content: ... }
export const createPost = async (content: string): Promise<Post> => {
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

export const deletePost = async (id: string): Promise<boolean> => {
    const res = await fetch(
        BASE_URL + "/posts/" + id,
        { method: "DELETE" }
    );
    return res.ok;
}
