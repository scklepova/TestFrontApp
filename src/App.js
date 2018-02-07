// @flow
import * as React from 'react'
import TodoList from './TodoList'

type AppProps = {};

export default class App extends React.Component<AppProps> {
    render() {
        return (
            <div>
                <TodoList />
            </div>
        );
    }
}