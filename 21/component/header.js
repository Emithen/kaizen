import { createElement } from "react";

export const Header = ({ title }) => {
    return createElement(
        "h1",
        { className: "header" },
        title
    );
}
