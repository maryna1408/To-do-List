import './App.css';
import React, { useEffect } from 'react'
import { Switch, Route } from 'react-router-dom';
import TodoList from './components/TodoList';
import AddTodo from './components/AddTodo';


function App() {
  return (
    <div className="container">
      <Switch>
        <Route exact path="/">
          <h1>List</h1>
          <div className="todos-wrapper">
            <TodoList status="new"></TodoList>
            <TodoList status="process"></TodoList>
            <TodoList status="completed"></TodoList>
          </div>
          <AddTodo></AddTodo>
        </Route>
        <Route path="/add">
          <h1>Add</h1>
          <AddTodo></AddTodo>
        </Route>
      </Switch>
    </div>
  );
}

export default App;
