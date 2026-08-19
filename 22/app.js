import { createElement } from "react";

import { Header } from "./component/header.js";
import { Board } from "./component/board.js";

export const App = () => {
    return createElement(
        "div",
        { className: "app" },
        // assemble
        createElement(Header, { title: "자유 게시판" }),
        createElement(Board)
    );
}