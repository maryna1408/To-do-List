import './Todo.css'
export default function Todo({todo}) {
    return (
        <div className="todo">
            <a href="#"> <i className=" deleteBtn fas fa-trash-alt"></i></a>
            <h2>{todo.title}</h2>
            <h3>{todo.text}</h3>
            <h4>{todo.status}</h4>
        </div>
    )
}

