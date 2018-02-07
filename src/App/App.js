// @flow
import * as React from "react";
import TodoList from "../TodoList/TodoList";
import cn from "./App.less";

export default class App extends React.Component<{}> {
    render(): React.Node {
        return (
            <div className={cn("root")}>
                <TodoList />
            </div>
        );
    }
}
