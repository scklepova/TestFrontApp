// @flow
import * as React from "react";
import ReactDom from "react-dom";
import App from "./App/App";
import "./styles/reset.less";
import "./styles/typography.less";

const targetElement = document.getElementById("content");
if (targetElement == null) {
    throw new Error("Cannot render");
}

ReactDom.render(<App />, targetElement);
