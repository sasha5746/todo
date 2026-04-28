import { useState, useCallback } from 'react';

const AddTodo = ({ onAdd }) => {
  const [title, setTitle] = useState('');

  const handleSubmit = useCallback((e) => {
    e.preventDefault();
    if (title.trim()) {
      onAdd(title.trim());
      setTitle('');
    }
  }, [title, onAdd]);

  return (
    <form onSubmit={handleSubmit} className="todo-input">
      <input
        type="text"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        placeholder="Что нужно сделать сегодня?"
      />
      <button type="submit">Добавить</button>
    </form>
  );
};

export default AddTodo;