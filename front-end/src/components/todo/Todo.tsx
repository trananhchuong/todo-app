import React from 'react';
import './styles/todoStyles.scss';
import TodoTable from './component/TodoTable';

const Todo = (): JSX.Element => {
  const renderTitle = (): JSX.Element => {
    return <h1 className="title">ToDo Manage</h1>;
  };

  return <div className="todo-app">
    {renderTitle()}
    < TodoTable />
  </div>;
};

export default Todo;
