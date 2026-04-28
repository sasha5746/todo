import { useCallback } from 'react';
import { useDispatch } from 'react-redux';
import { toggleTodo, deleteTodo } from '../features/todos/todoSlice';

const TodoItem = ({ todo }) => {
  const dispatch = useDispatch();

  const handleToggle = useCallback(() => {
    dispatch(toggleTodo(todo));
  }, [dispatch, todo]);

  const handleDelete = useCallback(() => {
    if (window.confirm('Удалить задачу?')) {
      dispatch(deleteTodo(todo.id));
    }
  }, [dispatch, todo.id]);

  return (
    <div className="todo-item">
      <input
        type="checkbox"
        checked={todo.completed}
        onChange={handleToggle}
      />
      <span className={`todo-text ${todo.completed ? 'completed' : ''}`}>
        {todo.title}
      </span>
      <button
        onClick={handleDelete}
        className="delete-btn"
      >
        Удалить
      </button>
    </div>
  );
};

export default TodoItem;