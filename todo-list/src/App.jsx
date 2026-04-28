import { useEffect, useCallback, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchTodos, addTodo } from './features/todos/todoSlice';
import AddTodo from './components/AddTodo';
import TodoList from './components/TodoList';
import './App.css';

function App() {
  const dispatch = useDispatch();
  const { items, loading, error } = useSelector((state) => state.todos);

  const [filter, setFilter] = useState('all');
  useEffect(() => {
    dispatch(fetchTodos());
  }, [dispatch]);

  const handleAdd = useCallback((title) => {
    if (title.trim()) {
      dispatch(addTodo(title.trim()));
    }
  }, [dispatch]);

    const refreshTodos = () => {
    dispatch(fetchTodos());
  };

  const filteredTodos = items.filter(todo => {
    if (filter === 'active') return !todo.completed;
    if (filter === 'completed') return todo.completed;
    return true;
  });

  const activeCount = items.filter(t => !t.completed).length;

  return (
    <div className="app">
      <div className="header">
        <h1>To‑Do</h1>
      </div>

      <div className="add-section">
        <AddTodo onAdd={handleAdd} />
      </div>

      <div className="filters">
        <div className="filter-buttons">
          <button 
            className={filter === 'all' ? 'active' : ''} 
            onClick={() => setFilter('all')}
          >
            Все
          </button>
          <button 
            className={filter === 'active' ? 'active' : ''} 
            onClick={() => setFilter('active')}
          >
            Активные
          </button>
          <button 
            className={filter === 'completed' ? 'active' : ''} 
            onClick={() => setFilter('completed')}
          >
            Выполненные
          </button>
        </div>
        
        <div style={{ display: 'flex', gap: '12px', alignItems: 'center' }}>
          <span>Задач: <strong>{activeCount}</strong></span>
          <button 
            onClick={refreshTodos}
            disabled={loading}
            style={{
              padding: '8px 16px',
              background: '#334155',
              color: 'white',
              border: 'none',
              borderRadius: '8px',
              cursor: loading ? 'not-allowed' : 'pointer',
              fontSize: '14px'
            }}
          >
            {loading ? 'Обновление...' : 'Обновить'}
          </button>
        </div>
      </div>

      <div className="todo-list">
        {loading && <div className="empty-state">Загрузка задач...</div>}
        {error && <div className="empty-state">Ошибка: {error}</div>}

        <TodoList todos={filteredTodos} />

        {!loading && filteredTodos.length === 0 && (
          <div className="empty-state">
            Нет задач для отображения
          </div>
        )}
      </div>
    </div>
  );
}

export default App;