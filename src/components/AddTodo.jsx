import { addTodo } from "../api/crud";
import { useTodos } from "./../hooks/useTodos";
import './AddTodo.css'
import Header from "./Header";


export default function AddTodo() {
  const [, dispatch] = useTodos();
  async function handleSubmit(event) {
    event.preventDefault();
    const newTodo = {
      title: event.target.title.value.trim(),
      text: event.target.text.value.trim(),
      status: 1,
      createdAt: Date.now(),
      updatedAt: null,
    };
    const [savedTodo, savedTodoError] = await addTodo(newTodo);
    if (!savedTodoError) {
      dispatch({ type: "ADD", payload: savedTodo });
      event.target.reset()
    }
  }
  return (
    <form onSubmit={handleSubmit} className="add-form">
      <h2>Add todo</h2>
      <input placeholder="Title" type="text" name="title" required />
      <textarea placeholder="Text..." name="text" cols="30" rows="10"></textarea>
      <select name="selectPriority">
        <option value="value1">1</option>
        <option value="value2" selected>2</option>
        <option value="value3">3</option>
      </select>
      <button className="addBtn" type="submit">Save</button>
    </form>
  );
}
