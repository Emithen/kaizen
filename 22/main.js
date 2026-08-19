import { createElement } from "react";
import { createRoot } from "react-dom/client";

import { App } from "./app.js";

const rootEl = document.getElementById("root");
const root = createRoot(rootEl);

root.render(createElement(App));