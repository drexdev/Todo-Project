import { createContext, useContext } from "react";

interface TaskContextProps {
    
}

const TaskContext = createContext({} as TaskContextProps);

export const TaskUseProvider = TaskContext.Provider;
export const useTask = () => useContext(TaskContext);