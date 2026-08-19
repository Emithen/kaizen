import { createElement } from "react";
import { createRoot } from "react-dom/client";

import { App } from "./component/app.js";


// root
const rootEl = document.getElementById("root");
const root = createRoot(rootEl);

// render
root.render(createElement(App));