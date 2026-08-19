import { useState, createElement } from "react";
import { createRoot } from "react-dom/client";

// root
const rootEl = document.getElementById("root");
const root = createRoot(rootEl);



// App
const App = ({ children }) => {
    console.log("App render");
    return createElement(
        "div",
        { className : "page" },
        ...children
    );
}



// Greeting
const Greeting = () => {
    console.log("Greeting render");
    return createElement(
        "h1",
        { className : "greeting" },
        "Hello, world!"
    );
}



// Counter
const Counter = () => {
    console.log("Counter render");
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
        createElement(CounterDisplay, { count: count }),
        createElement(CounterButton, { variant: "increase", onClick: handleIncreaseButtonClick }),
        createElement(CounterButton, { variant: "decrease", onClick: handleDecreaseButtonClick })
    )
}



// Display
const CounterDisplay = ({ count }) => {
    console.log("CounterDisplay render");
    return createElement(
        "span",
        { className : "counter-display" },
        count
    );
}



// Button
const CounterButton = ({ variant, onClick }) => {
    console.log("CounterButton render");
    const label = variant === "increase" ? "+" : "-";

    return createElement(
        "button",
        { className : "counter-button", onClick : onClick },
        label
    );
}




root.render(createElement(App, null, [createElement(Greeting), createElement(Counter)]));


/*
    TDZ - Temporal Dead Zone
    let/const 에서 발생하는 개념
    var 에는 존재하지 않는 개념
*/