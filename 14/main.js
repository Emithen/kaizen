import React from "react";
import { createRoot } from "react-dom/client";

const rootEl = document.getElementById('root');

const root = createRoot(rootEl);

const greetingEl = React.createElement(
    'h1',
    { className: 'greeting' },
    'Hello, World!'
);

root.render(greetingEl);

console.log(rootEl);
// HTML 태그
// greeting element 까지 생성된 형태로
console.log(greetingEl);
// HTML 태그
// greeting 만
// <h1 class="greeting">Hello, World!</h1>

/* 
{
    "type": "h1",
    "key": null,
    "ref": null,
    "props": {
        "className": "greeting",
        "children": "Hello, World!"
    }
}
*/
