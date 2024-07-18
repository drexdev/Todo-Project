import React, { useState, useEffect, useCallback } from "react";
import { Task } from "../@types/task";
import { TaskUseProvider } from "../contexts/task-context";
import { api } from "../utils/api";

interface TaskProviderProps {
  children: React.ReactNode;
}

const TaskProvider: React.FC<TaskProviderProps> = ({ children }) => {
  const [tasks, setTasks] = useState<Task[]>([]);

  // Buscando as tarefas (GET)
  const getTasks = useCallback(async () => {
    try {
      const { data } = await api.get<Task[]>("/tasks");
      setTasks(data);
    } catch (error) {
      console.error("Erro ao buscar as tarefas:", error);
    }
  }, []);

  // Criando as tarefas (POST)
  const createTask = useCallback(
    async (task: Task) => {
      try {
        await api.post("/tasks", task);
        await getTasks();

        // TODO: Adicionar mensagem de sucesso.
      } catch (error) {
        console.error("Erro ao criar a tarefa:", error);
      }
    },
    [getTasks]
  );

  // Atualizando as tarefas (PUT)
  const updateTask = useCallback(
    async (task: Task) => {
      try {
        await api.put(`/tasks/${task.id}`, task);
        await getTasks();

        // TODO: Adicionar mensagem de sucesso.
      } catch (error) {
        console.error("Erro ao atualizar a tarefa:", error);
      }
    },
    [getTasks]
  );

  // Deletando as tarefas (DELETE)
  const deleteTask = useCallback(
    async (id: number) => {
      try {
        await api.delete(`/tasks/${id}`);
        await getTasks();

        // TODO: Adicionar mensagem de sucesso.
      } catch (error) {
        console.error("Erro ao deletar a tarefa:", error);
      }
    },
    [getTasks]
  );

  // Ao carregar o componente, buscar as tarefas;
  useEffect(() => {
    getTasks();
  }, [getTasks]);

  return (
    <TaskUseProvider value={{ tasks, createTask, updateTask, deleteTask }}>
      {children}
    </TaskUseProvider>
  );
};

export default TaskProvider;
