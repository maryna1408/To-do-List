import { fetchAdd } from "../api/crud";
import { useTodos } from "./../hooks/useTodos";

export default function AddTodo() {
  const [, dispatch] = useTodos();
  async function addTodo(event) {
    event.preventDefault();
    const newTodo = {
      title: event.target.title.value.trim(),
      text: event.target.text.value.trim(),
      status: "new",
      createdAt: Date.now(),
      changedAt: null,
    };
    const savedNewTodo = await fetchAdd("todos", newTodo);
    if (savedNewTodo) {
      dispatch({ type: "ADD", payload: savedNewTodo });
    }
  }
  return (
    <form onSubmit={addTodo}>
      <input type="text" name="title" required />
      <textarea name="text" cols="30" rows="10"></textarea>
      <button type="submit">Add todo</button>
    </form>
  );
}
