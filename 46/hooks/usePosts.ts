import { useCallback, useEffect, useState } from "react";
import { type Post, createPost, deletePost, getPosts } from "../api";

export const usePosts = () => {
    const [posts, setPosts] = useState<Post[]>([]);
    const [loadError, setLoadError] = useState<boolean>(false);
    const [actionError, setActionError] = useState<boolean>(false);
    const [loading, setLoading] = useState<boolean>(true);

    // load
    const loadPosts = useCallback(async (): Promise<void> => {
        setLoading(true);

        const result = await getPosts();

        if (result.ok) {
            setPosts(result.data);
        } else {
            setLoadError(true);
            console.error(result.message);
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
            setActionError(false);
        } else {
            setActionError(true);
            console.error(result.message);
        }
    };

    // remove
    /**
     * 현재는 removePost 에 성공할 경우
     * 클라이언트 정보에 의존해서 상태를 갱신하고 있다.
     * 
     * 나중에 db 상태를 갱신할 때마다
     * 성공 여부에 따른 클라이언트 상태 갱신을 어떻게 분기할지
     * 예를 들어 모든 갱신 시도에 대해 항상 db 상태를 재요청할지 등을
     * 정해야 할 것 같다.
     */
    const removePost = async (id: string) => {
        const result = await deletePost(id);

        if (result.ok) {
            setPosts(prev => prev.filter(post => post.id !== id));
            setActionError(false);
        } else {
            setActionError(true);
            console.error(result.message);
        }
    };

    return { loadPosts, posts, loadError, actionError, loading, addPost, removePost };
};