import './App.css';
import React, { useEffect } from 'react'
import { Switch, Route, Link } from 'react-router-dom';
import TodoList from './components/TodoList';
import AddTodo from './components/AddTodo';
import Header from './components/Header';
import TodoListDnd from './components/TodoListDnd';

function App() {
  return (
    <>
      <Header></Header>
      
      <div className="container">
        <Switch>
          <Route exact path="/">
            {/* <h1>List</h1> */}
            <TodoListDnd></TodoListDnd>
          </Route>
          <Route path="/add">
            <h1>Add</h1>
            <AddTodo></AddTodo>
          </Route>
        </Switch>
      </div>
    </>
  );
}

export default App;
