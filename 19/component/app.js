import { createElement } from "react";

import { Header } from "./header.js";
import { Board } from "./board.js";



// App
export const App = () => {
    return createElement(
        "div",
        { className: "app" },
        createElement(Header, { title: "자유 게시판" }),
        createElement(Board)
    );
}
