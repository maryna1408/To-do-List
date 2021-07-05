import { useTodos } from './../hooks/useTodos';
import Todo from './Todo';
import './TodoList.css'
export default function TodoList({status}) {
    const [todos] = useTodos()
    return (
        <div className={`todos ${status}`}>
            {todos.filter(todo => todo.status === status).map(todo => <Todo key={todo.id} todo={todo}></Todo>)}
        </div>
    )
}