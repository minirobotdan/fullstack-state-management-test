import {
    createStore,
    combineReducers,
    applyMiddleware,
    Store
} from 'redux'
import { todos } from './reducers'
import thunk     from 'redux-thunk'

/**
 * Persist state in localstorage
 * @param store 
 */
const saver = (store: Store) => (next: (arg0: any) => any) => (action: any) => {
    let result = next(action)
    localStorage['redux-store'] = JSON.stringify(store.getState())
    return result;
}

const storeFactory = () =>
    createStore(
        combineReducers({todos}),
        ((localStorage['redux-store']) ? JSON.parse(localStorage['redux-store']) : { todos: [] }),
        applyMiddleware(thunk, saver)
    )

export default storeFactory;