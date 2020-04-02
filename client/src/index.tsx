import * as React from "react";
import * as ReactDOM from "react-dom";
import { createGlobalStyle } from 'styled-components';
import { TodosComponent } from "./todos/todos.component";

/**
 * Example global styles
 */
const GlobalStyle = createGlobalStyle`
    html { 
        font-family: dm, monospace;
        background: rgb(29, 31, 39);
    }
    body {
        color: rgba(255,255,255,0.5);
        padding: 0;
        margin: 0;
        display: grid;
        align-items: center;
        justify-items: center;
        margin-top: 15vh;
    }
`

const todos = [
    {
        id: 1,
        text: 'test 1',
        done: true
    },
    {
        id: 2,
        text: 'test 2',
        done: false
    }
]

ReactDOM.render(
        <div>
            <GlobalStyle />
            <h1>TODOS</h1>
            <TodosComponent todos={todos}></TodosComponent>
        </div>,
    document.getElementById("app-root")
);
