import { useState } from "react";
import { useTask } from "../../../contexts/task-context";
import { TaskDialog } from "./task-dialog";

interface TaskEditProps {
  id: number;
  children: JSX.Element;
}

export const TaskEdit = ({ id, children }: TaskEditProps) => {
  const [open, setOpen] = useState(false);
  const { updateTask, getTask } = useTask();

  const task = getTask(id);

  const handleFormSubmit = (title: string, description: string) => {
    updateTask({
      id,
      title,
      description,
      status: "todo",
    });

    setOpen(false); // Fecha o dialogo aberto ao criar uma tarefa.
  };

  return (
    <TaskDialog
      isOpen={open}
      onOpenChange={setOpen}
      title="Atualizar Tarefa"
      description="Atualize os detalhes de uma tarefa existente, incluindo título e descrição."
      onSubmit={handleFormSubmit}
      initialData={
        task ? { title: task.title, description: task.description } : {}
      }
    >
      {children}
    </TaskDialog>
  );
};
