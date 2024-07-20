import { useState } from "react";
import { useTask } from "../../../contexts/task-context";
import { TaskDialog } from "./task-dialog";

export const TaskCreate = ({ children }: { children: JSX.Element }) => {
  const [open, setOpen] = useState(false);
  const { createTask } = useTask();

  const handleFormSubmit = (title: string, description: string) => {
    createTask({
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
      title="Criar Tarefa"
      description="Crie uma nova tarefa definindo o título e descrição."
      onSubmit={handleFormSubmit}
    >
      {children}
    </TaskDialog>
  );
};
