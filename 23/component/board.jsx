import { useState } from "react";

import { Button } from "./button.jsx";

import { POST_LIST } from "../mock.js";

let nextId = 0;

export const Board = () => {
    const [posts, setPosts] = useState(() => POST_LIST.map((content) => ({ id: nextId++, content: content })));
    const [input, setInput] = useState("");

    const handleItemDelete = (id) => {
        setPosts(prev => prev.filter((post) => post.id !== id));
    }

    const handleInputChange = (e) => {
        setInput(e.target.value);
    }

    const handleAddPostButtonClick = () => {
        setPosts(prev => [...prev, { id: nextId++, content: input }]);
        setInput("");
    }

    return <div className="board-body">
        <List data={posts} onDelete={handleItemDelete} />
        <Input value={input} onChange={handleInputChange} />
        <Button label="항목 추가" onClick={handleAddPostButtonClick} />
    </div>
}

const List = ({ data, onDelete }) => {
    return <ul className="board-list">
        {data.map(item => <Item key={item.id} content={item.content} onDelete={() => onDelete(item.id)} />)}
    </ul>
}

const Item = ({ content, onDelete }) => {
    return <li className="board-item">
        <span className="board-item-content">{content}</span>
        <Button label="X" onClick={onDelete} />
    </li>
}

const Input = ({ value, onChange }) => {
    return <input className="board-input" type="text" value={value} onChange={onChange} />
}