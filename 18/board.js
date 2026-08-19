import { createElement, useState } from "react";

const MOCK_POSTS = ["안녕", "포챔스 재밌다", "ES 모듈", "named prop"];

/*
    createElement 호출과 함께 넘겨 준 key 값은 ReactElement 객체의 key 필드로 자동 지정된다
*/
export const Board = () => {
    const [posts, setPosts] = useState(MOCK_POSTS);

    return createElement(
        "ul",
        { className: "board" },
        posts.map((post, index) => createElement(Item, { key: index, content: post }))
    );
}

/*
    host component 의 className 은 React 가 실제 DOM 의 class 속성으로 꽂아준다
    그러나, custom component 의 경우 아무것도 해주지 않는다
*/
const Item = ({ content }) => {
    return createElement(
        "li",
        { className: "item" },
        content
    );
}