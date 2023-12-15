import {
  useGetTodosQuery,
  useAddTodoMutation,
  useDeleteTodoMutation,
} from "./redux/todosApi";
import { useState } from "react";

function App() {
  const [count, setCount] = useState("");
  const [newTodo, setNewTodo] = useState("");
  const { data = [], isLoading } = useGetTodosQuery(count);
  const [addTodo] = useAddTodoMutation(); // При необходимости можно достать статус загрузки, ошибки и т.д.
  const [deleteTodo] = useDeleteTodoMutation();

  const handleAddNewTodo = async () => {
    if (newTodo) {
      await addTodo({ text: newTodo }).unwrap();
    }
    setNewTodo("");
  };

  const handleDeleteTodo = async id => {
    await deleteTodo(id).unwrap();
  };

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <div>
        <input
          type="text"
          value={newTodo}
          onChange={e => setNewTodo(e.target.value)}
        />
        <button onClick={handleAddNewTodo}>Add todo</button>
      </div>
      <div>
        <select value={count} onChange={e => setCount(e.target.value)}>
          <option value="">all</option>
          <option value="1">1</option>
          <option value="2">2</option>
          <option value="3">3</option>
        </select>
      </div>
      <ul>
        {data.map(item => (
          <div key={item.id}>
            <li>{item.text}</li>
            <button onClick={() => handleDeleteTodo(item.id)}>Remove</button>
          </div>
        ))}
      </ul>
    </div>
  );
}

export default App;
