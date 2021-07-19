import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import Todo from "./Todo";
import { useState, useEffect } from "react";
import { updateTodo } from "../api/crud";
import { useTodos } from "./../hooks/useTodos";
import { determineStatus, termineStatus } from "./../utils/common";

export default function TodoListDnd() {
  const [todos, dispatchTodos] = useTodos();
  const [todoLists, setTodoLists] = useState({
    new: [],
    process: [],
    done: [],
  });
  useEffect(() => {
    console.log("todos from context", todos);
    const statuses = [1, 2, 3];
    const newState = {};
    statuses.forEach((status) => {
      const filteredTodos = todos.filter((todo) => todo.status === status);
      newState[determineStatus(status)] = filteredTodos;
    });
    setTodoLists(newState);
  }, [todos]);

  useEffect(() => {
    console.log(todoLists);
  }, [todoLists]);

  //   function reorder(list, startIndex, endIndex) {
  //       const result = Array.from(list);
  //       const [removed] = result.splice(startIndex, 1);
  //       result.splice(endIndex, 0, removed);
  //       return result;
  //     }

  async function move(sourceList, destinationList, droppableSource, droppableDestination) {
    const sourceClone = [...sourceList];
    const destClone = [...destinationList];
    const [removed] = sourceClone.splice(droppableSource.index, 1);
    //   destClone.splice(droppableDestination.index, 0, removed);
    const newStatus = termineStatus(droppableDestination.droppableId);
    removed.status = newStatus;
    removed.updatedAt = Date.now();
    destClone.push(removed);
    setTodoLists((prev) => ({
      ...prev,
      [droppableSource.droppableId]: sourceClone,
      [droppableDestination.droppableId]: destClone,
    }));
    const [updatedTodo, updatedTodoError] = await updateTodo(removed.id, removed);
    if (!updatedTodoError) {
      dispatchTodos({ type: "UPDATE", payload: updatedTodo });
    } else {
      alert("Error! Todo is not updated! Try again later...");
    }
  }

  async function onDragEnd({ source, destination }) {
    // dropped outside the list
    if (!destination) {
      return;
    }
    //   if (source.droppableId === destination.droppableId) {
    //     const items = reorder();
    //   }
    if (source.droppableId !== destination.droppableId) {
      move(todoLists[source.droppableId], todoLists[destination.droppableId], source, destination);
    }
  }
  return (
    <div className="todos-wrapper">
      <DragDropContext onDragEnd={onDragEnd}>
        <div className="todos new">
          <h2>new</h2>
          <Droppable droppableId="new" direction="vertical">
            {(provided) => (
              <div className="todos-content" ref={provided.innerRef}>
                {todoLists.new
                  .sort((a, b) => a.priority - b.priority || b.updatedAt - a.updatedAt || b.createdAt - a.createdAt)
                  .map((todo, index) => {
                    return (
                      <Draggable key={todo.id.toString()} draggableId={todo.id.toString()} index={index}>
                        {(provided) => {
                          return (
                            <div ref={provided.innerRef} {...provided.draggableProps} {...provided.dragHandleProps}>
                              <Todo todo={todo}></Todo>
                            </div>
                          );
                        }}
                      </Draggable>
                    );
                  })}
                {provided.placeholder}
              </div>
            )}
          </Droppable>
        </div>

        <div className="todos process">
          <h2>process</h2>
          <Droppable droppableId="process" direction="vertical">
            {(provided) => (
              <div className="todos-content" ref={provided.innerRef}>
                {todoLists.process
                  .sort((a, b) => a.priority - b.priority || b.updatedAt - a.updatedAt || b.createdAt - a.createdAt)
                  .map((todo, index) => {
                    return (
                      <Draggable key={todo.id.toString()} draggableId={todo.id.toString()} index={index}>
                        {(provided) => {
                          return (
                            <div ref={provided.innerRef} {...provided.draggableProps} {...provided.dragHandleProps}>
                              <Todo todo={todo}></Todo>
                            </div>
                          );
                        }}
                      </Draggable>
                    );
                  })}
                {provided.placeholder}
              </div>
            )}
          </Droppable>
        </div>
        <div className="todos done">
          <h2>done</h2>
          <Droppable droppableId="done" direction="vertical">
            {(provided) => (
              <div className="todos-content" ref={provided.innerRef}>
                {todoLists.done
                  .sort((a, b) => a.priority - b.priority || b.updatedAt - a.updatedAt || b.createdAt - a.createdAt)
                  .map((todo, index) => {
                    return (
                      <Draggable key={todo.id.toString()} draggableId={todo.id.toString()} index={index}>
                        {(provided) => {
                          return (
                            <div ref={provided.innerRef} {...provided.draggableProps} {...provided.dragHandleProps}>
                              <Todo todo={todo}></Todo>
                            </div>
                          );
                        }}
                      </Draggable>
                    );
                  })}
                {provided.placeholder}
              </div>
            )}
          </Droppable>
        </div>
      </DragDropContext>
    </div>
    // <div className="todos-wrapper">
    //   <TodoList status={1}></TodoList>
    //   <TodoList status={2}></TodoList>
    //   <TodoList status={3}></TodoList>
    // </div>
  );
}
