import { useState, createElement } from "react";
import { createRoot } from "react-dom/client";

// root
const rootEl = document.getElementById("root");
const root = createRoot(rootEl);


// Greeting
const Greeting = () => {
    return createElement(
        "h1",
        { className : "greeting" },
        "Hello, World!"
    );
}


// Counter
// div { display, +, - }
const Counter = () => {
    const [count, setCount] = useState(0);

    const handleIncreaseButtonClick = () => {
        setCount(prev => prev + 1);
    }

    const handleDecreaseButtonClick = () => {
        setCount(prev => prev - 1);
    }

    return createElement(
        "div",
        { className : "counter-body" },
        createElement(Display, { count }),
        createElement(Button, { type: "increase", action: handleIncreaseButtonClick }),
        createElement(Button, { type: "decrease", action: handleDecreaseButtonClick })
    );
}

const Display = ({ count }) => {
    return createElement(
        "span",
        { className : "counter-display"},
        count
    );
}

const Button = ({ type, action }) => {
    const className = type === "increase" ? "increase-button" : "decrease-button";
    const label = type === "increase" ? "+" : "-";

    return createElement(
        "button",
        { className : className, onClick : action },
        label
    );
}


// Page
const Page = () => {
    return createElement(
        "div",
        { className : "page" },
        createElement(Greeting),
        createElement(Counter)
    );
}


root.render(createElement(Page));
