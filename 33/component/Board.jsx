import { useState } from "react";

import { Button } from "./Button.jsx";

import { usePosts } from "../hooks/usePosts.js";

export const Board = () => {
    const [input, setInput] = useState("");
    const { posts, loading, addPost, removePost } = usePosts();

    const handleItemDelete = (id) => {
        removePost(id);
    };

    const handleInputChange = (e) => {
        setInput(e.target.value);
    };

    const handleAddItemButtonClick = () => {
        addPost(input);
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
