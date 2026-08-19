import { useEffect, useState } from "react";
import { createPost, deletePost, getPosts } from "../api.js";

export const usePosts = () => {
    const [posts, setPosts] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        // load
        const load = async () => {
            const data = await getPosts();
            setPosts(data);
            setLoading(false);
        };

        load();
    }, []);

    // add
    const addPost = async (content) => {
        // api 호출
        const created = await createPost(content);

        /*
            현재는 db 에서 가져온 res 의 타입과
            클라이언트 상태에 저장되는 post 의 객체 구조가 일치하기 때문에
            그대로 대입을 해도 문제가 없다.
        */

        // 결과를 세션에 반영
        const nextPosts = [...posts, created];
        setPosts(nextPosts);
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
    const removePost = async (id) => {
        const ok = await deletePost(id);

        if (!ok) return;

        const nextPosts = posts.filter(post => post.id !== id);
        setPosts(nextPosts);
    };

    return { posts, loading, addPost, removePost };
};