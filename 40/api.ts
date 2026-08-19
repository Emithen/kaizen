/**
 * TODO
 * api caller 반환 객체 고도화
 *  > 성공 여부, status 코드 등 추가적으로 필요한 정보 보존 목적
 */


const BASE_URL = "http://localhost:3000";

export type ApiResult<T> = 
    | { ok: true; data: T }
    | { ok: false; status: number | null; message: string };

/**
 * 현재 Post 타입은 네트워크 경계에서 단언된 이후
 * 변경 없이 서비스 전역에서 활용할 수 있으므로
 * api.ts 파일을 Post 타입의 주인으로 결정함
 */
export type Post = {
    id: string;
    content: string;
}

export const getPosts = async (): Promise<ApiResult<Post[]>> => {
    let res: Response;

    try {
        res = await fetch(
            BASE_URL + "/posts",
            { method: "GET" }
        );
    } catch (error) {
        return {
            ok: false,
            status: null,
            message: error instanceof Error ? error.message : "네트워크 요청 실패",
        };
    }

    if (!res.ok) {
        return {
            ok: false,
            status: res.status,
            message: "게시글 목록을 불러오지 못했습니다",
        };
    }

    const data: unknown = await res.json();
    return { ok: true, data: data as Post[] };
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
