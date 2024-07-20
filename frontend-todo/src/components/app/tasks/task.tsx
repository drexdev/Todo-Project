import { Pencil, Trash2 } from "lucide-react";
import { Task as TaskData } from "../../../@types/task";
import { TaskEdit } from "../dialog/task-update";

interface TaskProps {
  task: TaskData;
  toggleDone: (done: boolean) => void;
  handleDeleteTask: () => void;
}

// Fornecer estilos com base no status da tarefa.
const statusStyles = {
  todo: {
    text: "A fazer",
    style: "bg-red-100 border border-red-200 text-red-600",
  },
  done: {
    text: "Concluído",
    style: "bg-green-100 border border-green-200 text-green-600",
  },
};

export function Task({
  task,
  toggleDone,
  handleDeleteTask,
}: TaskProps) {
  const isDone = task.status === "done"; // Verificar se a tarefa está concluída.

  return (
    <div
      key={task.id}
      className={`shadow-md w-full flex items-center justify-between gap-6 bg-white border-slate-300 py-2 px-4 rounded-md flex-wrap ${
        isDone ? "opacity-60" : ""
      }`}
      title={new Date(task.id as number).toLocaleDateString()}
    >
      <div className="flex items-center gap-4">
        <div
          className="relative flex items-center"
          title="Marcar tarefa como concluída."
        >
          <input
            type="checkbox"
            checked={isDone}
            className="appearance-none peer cursor-pointer border border-indigo-200 transition-colors w-5 h-5 md:w-6 md:h-6 rounded-lg bg-indigo-100 checked:bg-indigo-600 checked:border-0 shrink-0"
            onChange={() => toggleDone(isDone)}
          />
          <svg
            className="absolute w-4 h-4 top-1/2 left-1/2 -translate-x-1/2 text-white -translate-y-1/2 hidden peer-checked:!block pointer-events-none"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="3"
          >
            <polyline points="20 6 9 17 4 12" />
          </svg>
        </div>

        <div className="text-left">
          <h1 className="md:text-base text-sm font-semibold break-all" title={task.title}>
            {task.title}
          </h1>
          <p className="md:text-sm text-xs break-all" title={task.description}>
            {task.description}
          </p>
        </div>
      </div>

      <div className="flex items-center gap-1 w-full sm:w-auto">
        <div
          className={`sm:text-xs md:text-sm text-small font-medium rounded-md flex items-center flex-1 h-8 px-3 ${
            statusStyles[task.status].style
          }`}
        >
          {statusStyles[task.status].text}
        </div>

        {/* Caso a tarefa esteja concluída, o botão de editar tarefa não deve ser exibido. */}
        {!isDone && (
          <TaskEdit id={task.id as number}>
            <button
              title="Editar Tarefa"
              className="p-2 w-8 h-8 md:w-9 md:h-9 rounded-lg flex items-center justify-center bg-indigo-100 cursor-pointer transition-all hover:bg-indigo-600 hover:text-white active:scale-90"
            >
              <Pencil strokeWidth={2} />
            </button>
          </TaskEdit>
        )}

        <button
          title="Excluir Tarefa"
          className="p-2 w-8 h-8 md:w-9 md:h-9 rounded-lg flex items-center justify-center bg-indigo-100 cursor-pointer transition-all hover:bg-red-500 hover:text-white active:scale-90"
          onClick={handleDeleteTask}
        >
          <Trash2 strokeWidth={2} />
        </button>
      </div>
    </div>
  );
}
