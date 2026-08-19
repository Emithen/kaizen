import { useState, createElement } from "react";

import { Button } from "./button.js";

import { POST_LIST } from "../mock.js";

export const Board = () => {
    const [posts, setPosts] = useState(POST_LIST);
    const [input, setInput] = useState("");

    const handleDelete = (index) => {
        setPosts(prev => prev.filter((_, i) => i !== index));
    }

    const handleInputChange = (e) => {
        setInput(e.target.value);
    }

    const handleAddPostButtonClick = () => {
        setPosts(prev => [...prev, input]);
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
        data.map((item, index) => createElement(Item, { key: index, content: item, onDelete: () => onDelete(index) }))
    );
}

const Item = ({ content, onDelete }) => {
    return createElement(
        "li",
        { className: "board-item" },
        content,
        createElement(Button, { label: "X", onClick: onDelete })
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
