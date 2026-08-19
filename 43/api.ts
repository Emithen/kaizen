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
export const createPost = async (content: string): Promise<ApiResult<Post>> => {
    let res: Response;

    try {
        res = await fetch(
            BASE_URL + "/posts",
            { 
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ content: content })
            }
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
            message: "게시글을 생성하지 못했습니다",
        };
    }
    
    const data: unknown = await res.json();
    return { ok: true, data: data as Post };
}

/**
 * 
 * deletePost 의 반환이 404 인 경우를 성공으로 볼 지 실패로 볼 지는 호출 맥락에 따라 달라지므로
 * status 필드에 정보를 보존하고 의미가 결정되는 호출부에서 대응을 결정할 수 있도록한다
 */
export const deletePost = async (id: string): Promise<ApiResult<void>> => {
    let res: Response;

    try {
        res = await fetch(
            BASE_URL + "/posts/" + id,
            { method: "DELETE" }
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
            message: "게시글을 삭제하지 못했습니다",
        };
    }

    return { ok: true, data: undefined };
}
