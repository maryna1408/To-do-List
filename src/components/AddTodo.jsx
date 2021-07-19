import { addTodo } from "../api/crud";
import { determinePriority } from "../utils/common";
import { useTodos } from "./../hooks/useTodos";
import './AddTodo.css'


export default function AddTodo() {
  const [, dispatch] = useTodos();
  async function handleSubmit(event) {
    event.preventDefault();
    const newTodo = {
      title: event.target.title.value.trim(),
      text: event.target.text.value.trim(),
      priority: Number(event.target.priority.value),
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
      <select name="priority" defaultValue="2">
        <option value="1">{determinePriority(1)}</option>
        <option value="2">{determinePriority(2)}</option>
        <option value="3">{determinePriority(3)}</option>
      </select>
      <button className="addBtn" type="submit">Save</button>
    </form>
  );
}
