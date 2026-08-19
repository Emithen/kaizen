import "./style.css";

import { createElement } from "react";
import { createRoot } from "react-dom/client";

import { App } from "./app";

// 유일한 의존성인 index.html 의 <div ... /> 가 변경이 매우 드물게 일어나므로
// non-null 단언을 써서 이후 코드를 단순하게 유지하였다.
const rootEl = document.getElementById("root")!;
const root = createRoot(rootEl);

root.render(createElement(App));