import React, { useContext } from 'react';
import cn from 'classnames';
import { Todo } from '../../types/Todo';
import { TodoContext } from '../../context/TodoContext';
import * as todoService from '../../api/todos';
import { Errors } from '../../types/Errors';

type Props = {
  todo: Todo;
};

export const TodoItem: React.FC<Props> = ({ todo }) => {
  const { todos, setTodos, setErrorMessage, loader, setLoader } =
    useContext(TodoContext);

  const deleteTodo = () => {
    setLoader(true);

    todoService
      .deleteTodo(todo.id)
      .then(() => {
        setTodos(todos.filter(task => task.id !== todo.id));
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
  };

  return (
    <div
      data-cy="Todo"
      className={cn('todo', {
        completed: todo.completed,
      })}
    >
      <label className="todo__status-label">
        <input
          data-cy="TodoStatus"
          type="checkbox"
          className="todo__status"
          checked={todo.completed}
        />
      </label>

      {/*  no span in edited todo - 3 */}
      <span data-cy="TodoTitle" className="todo__title">
        {todo.title}
      </span>

      {/*  no button in edited todo - 3 */}
      <button
        type="button"
        className="todo__remove"
        data-cy="TodoDelete"
        onClick={deleteTodo}
      >
        ×
      </button>

      {/* This form is shown instead of the title and remove button */}
      {/* <form>
        <input
          data-cy="TodoTitleField"
          type="text"
          className="todo__title-field"
          placeholder="Empty todo will be deleted"
          value="Todo is being edited now"
        />
    </form> */}

      {/* overlay will cover the todo while it is being deleted or updated */}

      {/* 'is-active' class puts in className this modal on top of the todo */}
      <div
        data-cy="TodoLoader"
        className={cn('modal overlay', {
          'is-active': todo.id === 0 || loader,
        })}
      >
        <div className="modal-background has-background-white-ter" />
        <div className="loader" />
      </div>
    </div>
  );
};

// const deleteTodo = () => {
//   setLoader(true);
//   todoService.deleteTodo(todo.id);
//   setTodos(todos.filter(task => task.id !== todo.id));
//   setLoader(false);
// };

// варіант ментора

// const deleteTodo = async () => {
//   setLoader(true);
//   await todoService.deleteTodo(todo.id);
//   setTodos(todos.filter(task => task.id !== todo.id));
//   setLoader(false);
// };
