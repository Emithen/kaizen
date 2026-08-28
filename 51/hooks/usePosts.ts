import { useCallback, useEffect, useState } from "react";
import { type ApiFailure, type Post, createPost, deletePost, getPosts } from "../api";

export const usePosts = () => {
    const [posts, setPosts] = useState<Post[]>([]);
    const [loadError, setLoadError] = useState<ApiFailure | null>(null);
    const [actionError, setActionError] = useState<ApiFailure | null>(null);
    const [loading, setLoading] = useState<boolean>(true);

    // load
    const loadPosts = useCallback(async (): Promise<void> => {
        setLoading(true);

        const result = await getPosts();

        if (result.ok) {
            setPosts(result.data);
            setLoadError(null);
        } else {
            setLoadError(result.error);
            console.error(result.error.message);
        }

        setLoading(false);
    }, []);

    useEffect(() => {
        loadPosts();
    }, [loadPosts]);

    // add
    const addPost = async (content: string) => {
        // api 호출
        const result = await createPost(content);

        if (result.ok) {
            // 결과를 세션에 반영
            setPosts(prev => [...prev, result.data]);
            setActionError(null);
        } else {
            setActionError(result.error);
            console.error(result.error.message);
        }
    };

    // remove
    /**
     * 갱신 전략: 낙관적 업데이트
     * 
     * 롤백은 삭제 시점의 idx 를 참조한다.
     * 삭제 시점의 idx 를 확보한 이후, 실제 롤백이 반영되기 이전 시점에 목록에 다른 변화가 끼어들게 될 경우 그 인덱스가 유효하지 않게 될 가능성이 있다.
     * 현재는 addPost 가 목록 맨 끝에만 추가하기 때문에 위와 같은 상황이 발생하지 않는다.
     */
    const removePost = async (id: string) => {
        const idx = posts.findIndex(post => post.id === id);
        
        if (idx === -1) {
            console.error("존재하지 않는 post id 입니다.");
            return;
        }

        const removed = posts[idx];

        setPosts(prev => prev.filter(post => post.id !== id));

        const result = await deletePost(id);

        if (result.ok) {
            setActionError(null);
        } else {
            // 404 가 아닐 때에만 롤백한다
            const is404 = result.error.kind === "http" && result.error.status === 404;
            if (!is404) setPosts(prev => [...prev.slice(0, idx), removed, ...prev.slice(idx)]);
            setActionError(result.error);
            console.error(result.error.message);
        }
    };

    return { loadPosts, posts, loadError, actionError, loading, addPost, removePost };
};
