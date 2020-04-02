import { Todo } from "@interfaces"

export const setTodos = (todos: Todo[]) => ({
    type: 'SET_TODOS',
    todos: todos
});

/**
 * GET TODOS
 */
export const fetchTodos = () => {
    return async (dispatch: any) => {
    
        try {
            const response = await fetch('http://localhost:3000');
            const json = await response.json();

            dispatch(setTodos(json as Todo[]));
        } catch (e) {
            console.log(e);
        }
    }
}

/**
 * POST TODO
 * @param todo
 */
export const addTodo = (todo: Todo) => {
    return async (dispatch: any) => {
        // API call to POST a new todo
        try {
            await fetch('http://localhost:3000', {
                method: 'POST',
                body: JSON.stringify(todo),
                headers: { "Content-Type": "application/json" }
            });
            dispatch(fetchTodos());
        } catch (e) {
            console.log(e);
        }
    }
}

/**
 * PUT TODO
 * @param todo
 */
export const editTodo = (todo: Todo) => {
    return async (dispatch: any) => {
        // API call to POST a new todo
        try {
            await fetch(`http://localhost:3000/${todo.id}`, {
                method: 'PUT',
                body: JSON.stringify(todo),
                headers: { "Content-Type": "application/json" }
            });
            dispatch(fetchTodos());
        } catch (e) {
            console.log(e);
        }
    }
}