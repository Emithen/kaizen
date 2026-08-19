/**
 * TODO
 * api caller 반환 객체 고도화
 *  > 성공 여부, status 코드 등 추가적으로 필요한 정보 보존 목적
 */


const BASE_URL = "http://localhost:3000";

/**
 * 현재 Post 타입은 네트워크 경계에서 단언된 이후
 * 변경 없이 서비스 전역에서 활용할 수 있으므로
 * api.ts 파일을 Post 타입의 주인으로 결정함
 */
export type Post = {
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
    const data: unknown = await res.json();
    return data as Post;
}

export const deletePost = async (id: string): Promise<boolean> => {
    const res = await fetch(
        BASE_URL + "/posts/" + id,
        { method: "DELETE" }
    );
    return res.ok;
}
