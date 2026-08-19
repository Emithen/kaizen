import { createElement, useState } from "react";
import { createRoot } from "react-dom/client";

// root
const rootEl = document.getElementById("root");
const root = createRoot(rootEl);



// App
const App = () => {
    return createElement(
        "div",
        { className: "app" },
        createElement(Header),
        createElement(Board)
    );
}

/*
JSX -> Vanilla JS

return (
    <App>
        <Header />
        <Board />
    </App>
)
*/



// Header
const Header = () => {
    return createElement(
        "h1",
        { className: "header" },
        "자유 게시판"
    );
}



// Board
const Board = () => {
    const [posts, setPosts] = useState(["1번 글", "2번 글"]);

    return createElement(
        "ul",
        { className: "board" },
        posts.map((post, index) => createElement("li", { className: "post", key: index }, post))
    )
}



// render
root.render(createElement(App));
