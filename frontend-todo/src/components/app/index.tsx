import { useState } from "react";

import { TaskCreate } from "./dialog/task-create";
import { ListTask } from "./tasks/list-tasks";

function App() {
  const [filter, setFilter] = useState("Todos");

  const handleFilterChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setFilter(event.target.value);
  };

  return (
    <div className="md:min-w-[600px] md:max-w-[800px] w-full relative text-center transition-all">
      <h1 className="lg:text-4xl text-3xl font-black">TODO - Lista de Tarefas</h1>
      <p className="text-slate-500 lg:text-base text-sm">Armazene suas tarefas e organize-as de acordo.</p>

      <div className="mt-10 w-full">
        <div className="flex justify-between items-center gap-2">
          <TaskCreate>
            <button
              className="py-3 px-4 md:text-base text-sm flex-1 bg-indigo-600 text-white font-medium rounded-md cursor-pointer transition-opacity hover:opacity-80"
            >
              <span>Criar Tarefa</span>
            </button>
          </TaskCreate>

          <select
            onChange={handleFilterChange}
            className="py-3 px-4 md:text-base text-sm bg-indigo-300 border-0 font-medium rounded-md cursor-pointer flex items-center gap-2 transition-opacity hover:opacity-80"
          >
            <option value="Todos">Todos</option>
            <option value="Pendentes">Pendentes</option>
            <option value="Concluídas">Concluídas</option>
          </select>
        </div>

        <ListTask filter={filter} />
      </div>
    </div>
  );
}

export default App;
