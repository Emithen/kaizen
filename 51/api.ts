const BASE_URL = "http://localhost:3000";

export type ApiFailure =
    | { kind: "network"; message: string }
    | { kind: "http"; status: number; message: string }
    | { kind: "parse"; message: string };

export type ApiResult<T> = 
    | { ok: true; data: T }
    | { ok: false; error: ApiFailure };

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

    // network - fetch()
    try {
        res = await fetch(
            BASE_URL + "/posts",
            { method: "GET" }
        );
    } catch (error) {
        return {
            ok: false,
            error: {
                kind: "network",
                message: error instanceof Error ? error.message : "네트워크 요청 실패"
            },
        };
    }

    // http - status code
    if (!res.ok) {
        return {
            ok: false,
            error: {
                kind: "http",
                status: res.status,
                message: `HTTP ${res.status}`
            },
        };
    }

    // parse - Body.json()
    try {
        const data: unknown = await res.json();
        return { ok: true, data: data as Post[] };
    } catch (error) {
        return {
            ok: false,
            error: {
                kind: "parse",
                message: error instanceof Error ? error.message : "추출 실패",
            },
        };
    }
}

// post -> { id: ..., content: ... }
export const createPost = async (content: string): Promise<ApiResult<Post>> => {
    let res: Response;

    // network
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
            error: {
                kind: "network",
                message: error instanceof Error ? error.message : "네트워크 요청 실패",
            },
        };
    }

    // http
    if (!res.ok) {
        return {
            ok: false,
            error: {
                kind: "http",
                status: res.status,
                message: `HTTP ${res.status}`,
            },
        };
    }

    // parse
    try {
        const data: unknown = await res.json();
        return { ok: true, data: data as Post };
    } catch (error) {
        return {
            ok: false,
            error: {
                kind: "parse",
                message: error instanceof Error ? error.message : "추출 실패",
            },
        };
    }
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
            error: {
                kind: "network",
                message: error instanceof Error ? error.message : "네트워크 요청 실패",
            },
        };
    }

    // http
    if (!res.ok) {
        return {
            ok: false,
            error: {
                kind: "http",
                status: res.status,
                message: `HTTP ${res.status}`,
            },
        };
    }

    return { ok: true, data: undefined };
}
