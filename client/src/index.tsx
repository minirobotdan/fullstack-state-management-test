import * as React              from "react";
import * as ReactDOM           from "react-dom";
import { createGlobalStyle }   from 'styled-components';
import { TodosComponent }      from "./todos/todos.component";
import { Provider, connect }   from 'react-redux';
import storeFactory            from './store';
import { Dispatch }            from "redux";
import { Todo }                from "@interfaces";
import { fetchTodos, addTodo, editTodo } from "./actions";

const store = storeFactory();
store.dispatch((fetchTodos() as any))
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
`;

const mapStateToProps = (state: any) => {
    const { todos } = state;
    return { todos,  };
};

const mapDispatchers = (dispatch: Dispatch) => ({
    onCreate(todo: Todo) {
        return dispatch((addTodo(todo) as any));
    },
    onEdit(todo: Todo) {
        return dispatch((editTodo(todo) as any));
    }
});

const TodoList = connect(mapStateToProps, mapDispatchers)(TodosComponent);


ReactDOM.render(
        <Provider store={store}>
            <GlobalStyle />
            <h1>TODOS</h1>
            <TodoList />
        </Provider>,
    document.getElementById("app-root")
);