import { useState, createElement } from "react";

import { Button } from "./button.js";

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

    return createElement(
        "div",
        { className: "board-body" },
        createElement(List, { data: posts, onDelete: handleItemDelete }),
        createElement(Input, { value: input, onChange: handleInputChange }),
        createElement(Button, { label: "항목 추가", onClick: handleAddPostButtonClick })
    )
}

const List = ({ data, onDelete }) => {
    return createElement(
        "ul",
        { className: "board-list" },
        data.map((item, index) => createElement(Item, { key: item.id, content: item.content, onDelete: () => onDelete(item.id) }))
    )
}

const Item = ({ content, onDelete }) => {
    return createElement(
        "div",
        { className: "board-item" },
        createElement("li", { className: "board-item-content" }, content),
        createElement(Button, { label: "X", onClick: onDelete })
    )
}

const Input = ({ value, onChange }) => {
    return createElement(
        "input",
        { className: "board-input", value: value, onChange: onChange }
    )
}