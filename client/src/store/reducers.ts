import { Todo } from "@interfaces"

interface TodoReducerAction {
    type?: string
    id?: number
    text?: string
    todos?: Todo[]
}

export const todos = (state: Todo[] = [], action: TodoReducerAction) => {
    switch (action.type) {
        case 'ADD_TODO':
            return [
                ...state,
                {
                    id: action.id,
                    text: action.text
                }
            ];
        case 'EDIT_TODO':
            return state.map((todo: Todo) => {
                if (todo.id === action.id) {
                    return {
                        id: todo.id,
                        text: action.text
                    }
                }
                return todo;
            })
        case 'SET_TODOS':
            return [...action.todos]
        default:
            return state;
    }
};