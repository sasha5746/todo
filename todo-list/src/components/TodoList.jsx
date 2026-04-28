import TodoItem from './TodoItem';

const TodoList = ({ todos }) => {
  return (
    <div className="divide-y">
      {todos.length === 0 ? (
        <p className="text-center py-8 text-gray-500">Список пуст</p>
      ) : (
        todos.map((todo) => <TodoItem key={todo.id} todo={todo} />)
      )}
    </div>
  );
};

export default TodoList;