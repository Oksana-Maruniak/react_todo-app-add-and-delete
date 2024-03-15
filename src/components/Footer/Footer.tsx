import React, { useContext } from 'react';
import * as todoService from '../../api/todos';
import { Filter } from '../Filter';
import { TodoContext } from '../../context/TodoContext';
import { Errors } from '../../types/Errors';

export const Footer: React.FC = () => {
  const { todos, setTodos, setLoader, setErrorMessage } =
    useContext(TodoContext);

  const hasEnoughTodos = todos.length > 0;

  const uncompletedTodos = todos.filter(todo => todo.completed === false);

  const hasEnoughCompletedTodo = todos.some(todo => todo.completed === true);

  const removeTodos = () => {
    todoService
      .deleteTodo(todo.id)
      .then(() => {
        setTodos(todos.filter(task => !task.completed));
      })
      .catch(() => {
        setErrorMessage(Errors.DeleteError);
        setTimeout(() => {
          setErrorMessage('');
        }, 2000);
      })
      .finally(() => {
        setLoader(false);
        setTodos(todos.filter(todo => todo.completed === false));
      });
  };

  const cleanCompletedTodos = () => {
    const completedTodos = todos.filter(todo => todo.completed);

    completedTodos.forEach(todo => removeTodos(todo.id));
  };

  return (
    <footer className="todoapp__footer" data-cy="Footer">
      {hasEnoughTodos && (
        <>
          <span className="todo-count" data-cy="TodosCounter">
            {`${uncompletedTodos.length} items left`}
          </span>

          <Filter />

          {/* this button should be disabled if there are no completed todos */}
          <button
            type="button"
            className="todoapp__clear-completed"
            data-cy="ClearCompletedButton"
            onClick={cleanCompletedTodos}
            disabled={!hasEnoughCompletedTodo}
          >
            Clear completed
          </button>
        </>
      )}
    </footer>
  );
};

// const clearTodo = () => {
//   const completedTodos = todos.filter(todo => todo.completed);

//   completedTodos.forEach(todo => removeTodo(todo.id));
// };

/*
  const cleanCompletedTodos = () => {
    setLoader(true);

    todos.map(todo => {
      if (todo.completed) {
        todoService
          .deleteTodo(todo.id)
          .then(() => {
            setTodos(todos.filter(task => !task.completed));
          })
          .catch(() => {
            setErrorMessage(Errors.DeleteError);
            setTimeout(() => {
              setErrorMessage('');
            }, 2000);
          })
          .finally(() => {
            setLoader(false);
          });
      }
    });

    setTodos(todos.filter(todo => todo.completed === false));
  };
*/
