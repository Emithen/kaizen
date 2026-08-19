import { useState, createElement } from "react";

import { Button } from "./button.js";

import { POST_LIST } from "../mock.js";

// session 단위로 유지되는 id anchor
// rerender 와 무관하게 단 한 번만 초기화
let nextId = 0;

export const Board = () => {
    console.log(nextId);
    const [posts, setPosts] = useState(() => POST_LIST.map((content) => ({ id: nextId++, content: content })));
    const [input, setInput] = useState("");

    const handleDelete = (id) => {
        setPosts(prev => prev.filter((post) => post.id !== id));
    }

    const handleInputChange = (e) => {
        setInput(e.target.value);
    }

    const handleAddPostButtonClick = () => {
        setPosts(prev => [...prev, { id: nextId++, content: input }]);
        setInput("");
    }

    return createElement(
        "div",
        { className: "board-body" },
        createElement(List, { data: posts, onDelete: handleDelete }),
        createElement(Input, { value: input, onChange: handleInputChange }),
        createElement(Button, { label: "항목 추가", onClick: handleAddPostButtonClick })
    );
}

const List = ({ data, onDelete }) => {
    return createElement(
        "ul",
        { className: "board-list" },
        data.map((item) => createElement(Item, { key: item.id, content: item.content, onDelete: () => onDelete(item.id) }))
    );
}

const Item = ({ content, onDelete }) => {
    return createElement(
        "li",
        { className: "board-item" },
        content,
        createElement(Button, { label: "X", onClick: onDelete }),
        createElement("input", { type: "text" })
    );
}

const Input = ({ value, onChange }) => {
    return createElement(
        "input",
        { 
            className: "board-input",
            onChange: onChange,
            value: value
        }
    );
}
