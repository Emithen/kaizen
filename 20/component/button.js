import { createElement } from "react";

export const Button = ({ label, onClick }) => {
    return createElement(
        "button",
        { className: "button", onClick: onClick },
        label
    );
}
