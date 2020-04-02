import * as React    from 'react'
import { Component } from "react";
import styled        from 'styled-components';
import { Todo }      from '@interfaces';

export interface TodosComponentProps {
    todos: Todo[]
}

interface TodosComponentState {
    todos: Todo[]
    newTodo: string
};

const TodosWrapper = styled.div`

    width: 50vw;

    .todo {
        display: grid;
        grid-template-columns: 3fr 1fr;
        
        input[type=checkbox] {
            justify-self: end;
        }
    }

    input[type=text] {
        width: 100%;
        margin-top: 15px;
        height: 40px;
    }

    button {
        width: 100%;
        padding: 7px;
        font-size: 1em;
        color: rgba(255,255,255,0.7);
        border: none;
        background: rgba(255,255,255,0.2);
        cursor: pointer;
        outline: none;
        margin-top: 15px;
    }
`;

export class TodosComponent extends Component<TodosComponentProps, TodosComponentState> {
    
    constructor(props: any) {
        super(props);
        const { todos } = props;
        // This is the only time it's safe to directly set the state! Otherwise use this.setState().
        this.state = {
            todos,
            newTodo: ''
        };
    }

    /**
     * Updates the counter property of state when triggered from a mouse click.
     * @param event 
     */
    private addTodo(): void {
        const { newTodo, todos } = this.state;

        todos.push({id: (todos.length + 1), text: newTodo, done: false });
        const newState = {
            todos,
            newTodo: ''
        }
        this.setState(newState);
    }

    /**
     * Toggles the done state of a todo
     * @param index 
     */
    private toggleDone(index: number) {
        const { todos } = this.state;
        todos[index].done = !todos[index].done;
        
        this.setState({
            ...this.state,
            todos
        });
    }

    /**
     * Updates the text input with new todo info.
     * @param event 
     */
    private updateNewTodo() {
        const newTodo = (event.target as HTMLInputElement).value;
        const newState = {
            ...this.state,
            newTodo
        }
        this.setState(newState);
    }

    /**
     * JSX method to render individual rows
     * @param todos 
     */
    private renderTodos(todos: Todo[]) {
        return todos.map((todo: Todo, index: number) => <div className="todo" key={todo.id}><span>{todo.text}</span><input type="checkbox" checked={todo.done} onChange={e => this.toggleDone(index)} /></div>)
    }

    public render() {

        // Object destructuring is great for referencing props and state in templates too.
        const { todos, newTodo } = this.state;

        return (
            <TodosWrapper>
                {this.renderTodos(todos)}
                <input placeholder="What would you like to do?" type="text" value={newTodo} onChange={this.updateNewTodo.bind(this)} />
                <button onClick={this.addTodo.bind(this)}>Add Todo</button>
            </TodosWrapper>
        )
    }
}