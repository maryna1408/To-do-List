import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import TodosProvider from './hooks/useTodos';
import { BrowserRouter } from 'react-router-dom';

ReactDOM.render(
  <React.StrictMode>
    <BrowserRouter>
      <TodosProvider>
        <App />
      </TodosProvider>
    </BrowserRouter>
  </React.StrictMode>,
  document.getElementById('root')
);
