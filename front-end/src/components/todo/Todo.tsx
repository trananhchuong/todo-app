import React, { useEffect, useRef, useState } from 'react';
import AppUtils from '../../utils/AppUtils';
import _ from 'lodash';
import Axios from 'axios';
import { TodoType } from '../../types/TypeConstants';
import Loading from '../loading/Loading';
import './styles/todoStyles.scss';
import { AppState } from '../../types/InterfaceConstants';

const stateDefault: AppState = {
  loading: true,
  todos: [],
  name: '',
  content: ''
}

function Todo() {
  const [appState, setAppState] = useState<AppState>(stateDefault);

  useEffect(() => {
    fetchDataTodo()
  }, []);


  const fetchDataTodo = async () => {
    try {
      const url: string = "/api/todo";
      const res = await AppUtils.Axios.get(url);
      console.log("res", res)

      if (res) {
        const dataRes = _.get(res, 'data');
        if (dataRes.success) {
          const todosRes = _.get(dataRes, 'results');
          setAppState({
            ...appState,
            todos: todosRes,
            loading: false
          });
        }
      }

    } catch (error) {
      console.log("App -> error", error)
    }
  }

  const handleDelete = async (id: string) => {
    const url: string = `/api/todo/delete?id=${id}`;

    try {
      const resp = await Axios.delete(url);
      if (resp.data.success) {
        fetchDataTodo();
      }

    } catch (error) {
      console.log("addToList -> error", error)
    }
  }

  const renderListTodo = (todos: TodoType[]) => {
    if (_.size(todos) === 0) return null;
    return <ul>
      {
        _.map(todos, (todo, index) => {
          return <li key={todo.id || index}>
            {todo.name}: {todo.content}
            <button onClick={() => handleDelete(todo.id)}>&times;</button>
          </li>
        })
      }
    </ul>
  }

  const addToList = async (dataPost: any) => {
    const url: string = "/api/todo/create";

    try {
      const resp = await Axios.post(url, dataPost);
      if (resp.data.success) {
        fetchDataTodo();
      }
    } catch (error) {
      console.log("addToList -> error", error)
    }

  }


  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    setAppState({
      ...appState,
      loading: true
    });

    const dataPost: any = {
      name: appState.name,
      content: appState.content,
      completed: false
    };

    addToList(dataPost);
  };

  const renderFormAdd = () => {
    return <form
      onSubmit={handleSubmit}
    >
      <label htmlFor="name">Name</label>
      <input
        type="text"
        onChange={e => setAppState({
          ...appState,
          name: e.target.value
        })}
        value={appState.name}
        name="name"
        required
      />
      <label htmlFor="name">Content</label>
      <input
        type="text"
        onChange={e => setAppState({
          ...appState,
          content: e.target.value
        })}
        value={appState.content}
        required
        name="content"
      />
      <button type="submit">Add</button>
    </form>
  }

  if (appState.loading) return <div className="loading-box">
    <Loading />
  </div>;

  return (
    <div className="list-box">
      <h1>Todo List: </h1>
      {renderFormAdd()}
      {renderListTodo(appState.todos)}
    </div>
  );
}

export default Todo;
