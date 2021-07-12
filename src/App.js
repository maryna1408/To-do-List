import './App.css';
import React, { useEffect } from 'react'
import { Switch, Route, Link } from 'react-router-dom';
import TodoList from './components/TodoList';
import AddTodo from './components/AddTodo';
import Header from './components/Header';

function App() {
  return (
    <div className="container">
      <Switch>
        <Route exact path="/">
          <Header></Header>
          {/* <h1>List</h1> */}
          <div className="todos-wrapper">
            <TodoList status={1}></TodoList>
            <TodoList status={2}></TodoList>
            <TodoList status={3}></TodoList>
          </div>
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
