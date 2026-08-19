import { useEffect, useRef, useState } from "react";
import { getPosts, savePosts } from "../api.js";

export const usePosts = () => {
    const nextIdRef = useRef(0);
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

    // update
    const updatePosts = async (nextPosts) => {
        setPosts(nextPosts);
        await savePosts(nextPosts.map(post => post.content));
    };

    // add
    const addPost = (content) => {
        const nextPosts = [...posts, { id: nextIdRef.current++, content: content}];
        updatePosts(nextPosts);
    };

    // remove
    const removePost = (id) => {
        const nextPosts = posts.filter(post => post.id !== id);
        updatePosts(nextPosts);
    };

    return { posts, loading, addPost, removePost };
};