import { useEffect, useRef, useState } from "react";

import { Button } from "./Button.jsx";

import { STORAGE_KEY } from "../mock.js";

import { getPosts } from "../api.js";

export const Board = () => {
    const nextIdRef = useRef(0);
    const [loading, setLoading] = useState(true);

    const [posts, setPosts] = useState([]);
    const [input, setInput] = useState("");

    useEffect(() => {
        const load = async () => {
            const data = await getPosts();
            setPosts(data.map(post => ({ id: nextIdRef.current++, content: post })));
            setLoading(false);
        };

        load();
    }, []);

    useEffect(() => {
        if (loading) return;

        // 직렬화
        const data = JSON.stringify(posts.map(post => post.content));

        // 저장
        localStorage.setItem(STORAGE_KEY, data);
    }, [posts]);

    const handleItemDelete = (id) => {
        setPosts(prev => prev.filter(post => post.id !== id));
    }

    const handleInputChange = (e) => {
        setInput(e.target.value);
    }

    const handleAddItemButtonClick = () => {
        setPosts(prev => [...prev, { id: nextIdRef.current++, content: input }]);
        setInput("");
    }

    if (loading) return <div>로딩 중...</div>;

    return <div className="board-body">
        <List data={posts} onDelete={handleItemDelete} />
        <Input value={input} onChange={handleInputChange} />
        <Button label="항목 추가하기" onClick={handleAddItemButtonClick} />
    </div>
}



const List = ({ data, onDelete }) => {
    return <ul className="board-list" role="list">
        {data.map(item => <Item key={item.id} content={item.content} onDelete={() => onDelete(item.id)} />)}
    </ul>
}



const Item = ({ content, onDelete }) => {
    return <li className="board-item">
        <span>{content}</span>
        <Button label="X" onClick={onDelete} />
    </li>
}



const Input = ({ value, onChange }) => {
    return <input className="input" value={value} onChange={onChange} />
}
