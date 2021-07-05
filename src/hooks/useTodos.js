import { useContext, useReducer, createContext, useEffect } from "react";
import { fetchByPath } from "../api/crud";

const initialState = []
const Context = createContext()
export const useTodos = () => useContext(Context)
const TodosProvider = ({ children }) => {
    const [data, dispatch] = useReducer(reducer, initialState)
    useEffect(() => {
        (async function () {
            const data = await fetchByPath('todos')
            console.log(data);
            dispatch({ type: 'SET_INITIAL', payload: data })
        })()
    }, [])
    function reducer(state, action) {
        switch (action.type) {
            case 'SET_INITIAL':
                return action.payload
            case 'ADD':
                return [...state, action.payload]
            case 'DELETE':
                return action.payload
            default:
                throw new Error('Wrong action type!')
        }
    }
    return <Context.Provider value={[data, dispatch]}>{children}</Context.Provider>
}
export default TodosProvider

