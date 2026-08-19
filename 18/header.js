import { createElement } from "react";

// Header
export const Header = ({ title }) => {
    return createElement(
        "h1",
        { className: "header" },
        title
    );
}