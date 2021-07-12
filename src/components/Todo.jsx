import "./Todo.css";
import { useState } from "react";
import { deleteTodo, updateTodo } from "../api/crud";
import { useTodos } from "./../hooks/useTodos";
import { determinePriority } from "../utils/common";


export default function Todo({ todo }) {
  const [, dispatchTodos] = useTodos();
  const [disabledDeleteBtn, setDisabledDeleteBtn] = useState(false);
  const [disabledNextBtn, setDisabledNextBtn] = useState(false);

  async function removeTodo(e) {
    setDisabledDeleteBtn(true);
    const [, deletedTodoError] = await deleteTodo(todo.id);
    if (!deletedTodoError) {
      dispatchTodos({ type: "DELETE", payload: todo.id });
    } else {
      setDisabledDeleteBtn(false);
      alert("Error! Todo is not deleted! Try again later...");
    }
  }
  async function nextStatus(e) {
    setDisabledNextBtn(true);
    const newTodoData = {
      status: todo.status + 1,
      updatedAt: Date.now(),
    };
    const [updatedTodo, updatedTodoError] = await updateTodo(todo.id, newTodoData);
    if (!updatedTodoError) {
      dispatchTodos({ type: "UPDATE", payload: updatedTodo });
    } else {
      setDisabledNextBtn(false);
      alert("Error! Todo is not updated! Try again later...");
    }
  }
  return (
    <div className="todo">
      <button className="deleteBtn" onClick={removeTodo} disabled={disabledDeleteBtn}>
        <i className="fas fa-trash-alt"></i>
      </button>
      <h2 className="title">{todo.title}</h2>
      <h3 className="text">{todo.text}</h3>
      {/* <h4>Priority: {determinePriority(priority)}</h4> */}
      {todo.status < 3 && (
        <button className="nextBtn" onClick={nextStatus} disabled={disabledNextBtn}>
          Next
        </button>
      )}
    </div>
  );
}
