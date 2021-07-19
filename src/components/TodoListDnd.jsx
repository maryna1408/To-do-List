import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import Todo from "./Todo";
import { useState, useEffect } from "react";
import {  updateTodo } from "../api/crud";
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
    console.log('todos from context',todos);
    const statuses = [1, 2, 3];
    const newState = {};
    statuses.forEach((status) => {
      const filteredTodos = todos
        .filter((todo) => todo.status === status)
        .sort((a, b) => a.priority - b.priority || b.updatedAt - a.updatedAt || b.createdAt - a.createdAt);
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

  const move =  (sourceList, destinationList, droppableSource, droppableDestination) => {
    const sourceClone = [...sourceList];
    const destClone = [...destinationList];
    const [removed] = sourceClone.splice(droppableSource.index, 1);
    //   destClone.splice(droppableDestination.index, 0, removed);
    const newStatus = termineStatus(droppableDestination.droppableId)
    const newTodoData = [
      removed.status = newStatus,
    removed.updatedAt = Date.now()
    ]
    const [updatedTodo, updatedTodoError] = updateTodo(droppableSource.index, newTodoData);
    if (!updatedTodoError) {
      
      dispatchTodos({ type: "UPDATE", payload: updatedTodo });
      destClone.push(removed);
    const newState = {};
    newState[droppableSource.droppableId] = sourceClone;
    newState[droppableDestination.droppableId] = destClone;
    return newState;
    } else {
      alert("Error! Todo is not updated! Try again later...");
    }
    
  };

  function onDragEnd({ source, destination }) {
    // dropped outside the list
    if (!destination) {
      return;
    }
    //   if (source.droppableId === destination.droppableId) {
    //     const items = reorder();
    //   }
    if (source.droppableId !== destination.droppableId) {
      const result = move(todoLists[source.droppableId], todoLists[destination.droppableId], source, destination);
      const newState = { ...todoLists, ...result };
      dispatchTodos({ type: "INIT", payload: Object.values(newState).flat() });
    }
  }
  return (
    <div className="todos-wrapper">
      <DragDropContext onDragEnd={onDragEnd}>
        <Droppable droppableId="new" direction="vertical">
          {(provided) => (
            <div className="todos new" ref={provided.innerRef}>
              <h2 className="status">New</h2>
              {todoLists.new.map((todo, index) => {
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
        <Droppable droppableId="process" direction="vertical">
          {(provided) => (
            <div className="todos process" ref={provided.innerRef}>
              <h2 className="status">Process</h2>
              {todoLists.process.map((todo, index) => {
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
        <Droppable droppableId="done" direction="vertical">
          {(provided) => (
            <div className="todos done" ref={provided.innerRef}>
              <h2 className="status">Done</h2>
              {todoLists.done.map((todo, index) => {
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
      </DragDropContext>
    </div>
    // <div className="todos-wrapper">
    //   <TodoList status={1}></TodoList>
    //   <TodoList status={2}></TodoList>
    //   <TodoList status={3}></TodoList>
    // </div>
  );
}
