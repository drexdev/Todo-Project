import { useTask } from "../../../contexts/task-context";
import { Task } from "./task";

export function ListTask({ filter }: { filter: string }) {
  const { tasks, deleteTask, updateTask } = useTask();

  // Filtrar as tarefas com base no filtro selecionado.
  const filteredTasks = tasks.filter((task) => {
    if (filter === "Pendentes") return task.status === "todo";
    if (filter === "Concluídas") return task.status === "done";
    return true; // Retornará todas as tarefas se nenhum filtro for selecionado.
  });

  // Organizar as tarefas pelo ID.
  const sortedTasks = filteredTasks.sort((a, b) => Number(b.id) - Number(a.id));

  return (
    <div className="w-full relative p-2 mt-3 bg-indigo-100 rounded-md flex flex-col gap-2 h-[600px] overflow-y-auto overflow-x-hidden border border-indigo-200">
      {sortedTasks.length > 0 ? (
        sortedTasks.map((task) => (
          <Task
            key={task.id}
            task={task}
            handleDeleteTask={() => deleteTask(task.id as number)}
            toggleDone={(isDone) =>
              updateTask({ ...task, status: isDone ? "todo" : "done" })
            }
          />
        ))
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
  );
}
