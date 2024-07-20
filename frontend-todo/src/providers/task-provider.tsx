import React, { useState, useEffect, useCallback } from "react";
import { Task } from "../@types/task";
import { TaskUseProvider } from "../contexts/task-context";
import { api } from "../utils/api";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

interface TaskProviderProps {
  children: React.ReactNode;
}

const TaskProvider: React.FC<TaskProviderProps> = ({ children }) => {
  const [tasks, setTasks] = useState<Task[]>([]);

  const getTask = useCallback(
    (id: number) => {
      const findTask = tasks.find((task) => task.id === id);
      return findTask;
    },
    [tasks]
  );

  // Buscando as tarefas (GET)
  const getTasks = useCallback(async () => {
    try {
      const { data } = await api.get<Task[]>("/tasks");
      setTasks(data);
    } catch (error) {
      toast.error("Ocorreu um erro ao buscar as tarefa.", {
        position: "bottom-right",
      });
    }
  }, []);

  // Criando as tarefas (POST)
  const createTask = useCallback(
    async (task: Task) => {
      try {
        await api.post("/tasks", task);
        await getTasks();

        toast.success("Tarefa criada com sucesso!", {
          position: "bottom-right",
        });
      } catch (error) {
        toast.error("Ocorreu um erro ao criar a tarefa.", {
          position: "bottom-right",
        });
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

        toast.success("Tarefa atualizada com sucesso!", {
          position: "bottom-right",
        });
      } catch (error) {
        toast.error("Ocorreu um erro ao atualizar a tarefa.", {
          position: "bottom-right",
        });
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

        toast.success("Tarefa deletada com sucesso!", {
          position: "bottom-right",
        });
      } catch (error) {
        toast.error("Ocorreu um erro ao deletar a tarefa.", {
          position: "bottom-right",
        });
      }
    },
    [getTasks]
  );

  // Ao carregar o componente, buscar as tarefas;
  useEffect(() => {
    getTasks();
  }, [getTasks]);

  return (
    <TaskUseProvider
      value={{ tasks, getTask, createTask, updateTask, deleteTask }}
    >
      {children}
    </TaskUseProvider>
  );
};

export default TaskProvider;
