import { useState, createElement } from "react";

import { POST_LIST } from "../mock.js";



export const Board = () => {
    const [posts, setPosts] = useState(POST_LIST);
    const [value, setValue] = useState("");

    const handleInputChange = (e) => {
        setValue(e.target.value);
    }

    const handleAddPostButtonClick = () => {
        setPosts(prev => [...prev, value]);
        setValue("");
    }

    return createElement(
        "div",
        { className: "board" },
        createElement(List, { items: posts }),
        createElement(Input, { value: value, onChange: handleInputChange }),
        createElement(Button, { label: "글 추가하기", onClick: handleAddPostButtonClick })
    );
}



const List = ({ items }) => {
    return createElement(
        "ul",
        { className: "board" },
        items.map((item, index) => createElement(Item, { content: item, key: index }))
    );
}



const Item = ({ content }) => {
    return createElement(
        "li",
        { className: "item" },
        content
    );
}



const Input = ({ value, onChange }) => {
    return createElement(
        "input",
        { className: "input", type: "text", value: value, onChange: onChange }
    );
}



const Button = ({ label, onClick }) => {
    return createElement(
        "button",
        { className: "button", onClick: onClick },
        label
    );
}