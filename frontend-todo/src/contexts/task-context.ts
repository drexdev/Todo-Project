import { createContext, useContext } from "react";
import { Task } from "../@types/task";

interface TaskContextProps {
  tasks: Task[];
  getTask: (id: number) => Task | undefined;
  createTask: (task: Task) => void;
  updateTask: (task: Task) => void;
  deleteTask: (id: number) => void;
}

const TaskContext = createContext({} as TaskContextProps);

export const TaskUseProvider = TaskContext.Provider;
export const useTask = () => useContext(TaskContext);