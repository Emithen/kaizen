import { useEffect, useState } from "react";

import { Button } from "./Button.jsx";

import { STORAGE_KEY, POST_LIST } from "../mock.js";

let nextId = 0;

const postList = JSON.parse(localStorage.getItem(STORAGE_KEY)) ?? POST_LIST;

export const Board = () => {
    const [posts, setPosts] = useState(() => postList.map((post) => ({ id: nextId++, content: post })));
    const [input, setInput] = useState("");

    useEffect(() => {
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
        setPosts(prev => [...prev, { id: nextId++, content: input }]);
        setInput("");
    }

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
