import { useState } from "react";

import { Button } from "./Button.jsx";

let nextId = 0;

export const Board = () => {
    const [posts, setPosts] = useState([]);
    const [input, setInput] = useState("");

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
