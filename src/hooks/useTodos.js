import { useContext, useReducer, createContext, useEffect } from "react";
import { getTodos } from "../api/crud";

const initialState = []
const Context = createContext()
export const useTodos = () => useContext(Context)
const TodosProvider = ({ children }) => {
    const [data, dispatch] = useReducer(reducer, initialState)
    useEffect(() => {
        (async function () {
            const [todos, todosError] = await getTodos()
            if (!todosError) {
                dispatch({ type: 'INIT', payload: todos })
            }
        })()
    }, [])
    function reducer(state, action) {
        switch (action.type) {
            case 'INIT': {
                return action.payload
            }
            case 'ADD': {
                return [...state, action.payload]
            }
            case 'DELETE': {
                const todoIdx = state.findIndex(todo => todo.id === action.payload)
                if (todoIdx !== -1) {
                    const newState = [...state]
                    newState.splice(todoIdx, 1)
                    return newState
                } else {
                    throw new Error('Todo index is not find!')
                }
            }
            case 'UPDATE': {
                const todoIdx = state.findIndex(todo => todo.id === action.payload.id)
                if (todoIdx !== -1) {
                    const newState = [...state]
                    newState.splice(todoIdx, 1, action.payload)
                    return newState
                } else {
                    throw new Error('Todo index is not find!')
                }
            }
            default:
                throw new Error('Wrong action type!')
        }
    }
    return <Context.Provider value={[data, dispatch]}>{children}</Context.Provider>
}
export default TodosProvider

