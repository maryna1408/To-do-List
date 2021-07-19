import { useTodos } from "./../hooks/useTodos";
import Todo from "./Todo";
import "./TodoList.css";
import { determineStatus } from "./../utils/common";

export default function TodoList({ status }) {
  const [todos] = useTodos();
  return (
    <div className={`todos ${determineStatus(status)}`}>
      <h2 className="status">{determineStatus(status)}</h2>
      {todos
        .filter((todo) => todo.status === status)
        .sort((a, b) => a.priority - b.priority || b.updatedAt - a.updatedAt || b.createdAt - a.createdAt)
        .map((todo) => (
          <Todo key={todo.id} todo={todo}></Todo>
        ))}
    </div>
  );
}
