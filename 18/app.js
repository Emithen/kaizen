import { createElement, useState } from "react";
import { createRoot } from "react-dom/client";

import { Header } from "./header.js";
import { Board } from "./board.js";

// root
const rootEl = document.getElementById("root");
const root = createRoot(rootEl);



// App
const App = () => {
    return createElement(
        "div",
        { className: "app" },
        createElement(Header, { title: "자유 게시판" }),
        createElement(Board)
    );
}



// render
root.render(createElement(App));
