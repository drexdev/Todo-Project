import { useTask } from "../../contexts/task-context";
import Task from "./Task";

function App() {
  const { tasks, createTask, deleteTask, updateTask } = useTask();

  const AllTasks = tasks
    .sort((a, b) => Number(b.id) - Number(a.id)) // Ordenando as tarefas de acordo com a data.
    .map((task) => (
      <Task
        key={task.id}
        task={task}
        handleDeleteTask={() => {
          deleteTask(task.id as number);
        }}
        toggleDone={(isDone) => {
          updateTask({ ...task, status: isDone ? "todo" : "done" });
        }}
      />
    ));

  return (
    <div className="md:w-[600px] w-full relative text-center transition-all">
      <h1 className="text-4xl font-black">TODO - ProUnion</h1>
      <p>Armazene suas tarefas e organize-as de acordo.</p>

      <div className="mt-10 w-full">
        <div className="flex justify-between items-center gap-2">
          <div
            className="py-3 px-4 text-base flex-1 bg-indigo-600 text-white font-medium rounded-md cursor-pointer transition-opacity hover:opacity-80"
            onClick={() =>
              createTask({
                title: "Nova Tarefa",
                description: "Descrição da Tarefa",
                status: "todo",
              })
            }
          >
            <span>Criar Tarefa</span>
          </div>

          <div className="py-3 px-4 text-base bg-indigo-950 text-white font-medium rounded-md cursor-pointer transition-opacity hover:opacity-80">
            <span>Todos ({AllTasks.length})</span>
          </div>
        </div>

        <div className="w-full relative p-2 mt-3 bg-indigo-100 rounded-md flex flex-col gap-2 max-h-[600px] overflow-auto border-2 border-indigo-100">
          {AllTasks.length > 0 ? (
            AllTasks
          ) : (
            <p>
              Lista de tarefas vazio (
              <b className="underline underline-offset-4 cursor-pointer">
                Crie uma
              </b>
              )
            </p>
          )}
        </div>
      </div>
    </div>
  );
}

export default App;
