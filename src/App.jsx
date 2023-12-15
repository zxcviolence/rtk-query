import { useGetTodosQuery } from "./redux/todosApi";

function App() {
  const { data = [], isLoading } = useGetTodosQuery();

  return (
    <div>
      {isLoading && <div>Loading...</div>}
      <ul>
        {data.map(item => (
          <li key={item.id}>{item.text}</li>
        ))}
      </ul>
    </div>
  );
}

export default App;
