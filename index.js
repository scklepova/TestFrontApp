import './mystyle.less'
import * as React from 'react'
import ReactDom from 'react-dom'
import App from './src/App.js'

const targetElement = document.getElementById("content");
if (targetElement == null) {
    throw new Error("Cannot render");
}

ReactDom.render(<App />, targetElement)
