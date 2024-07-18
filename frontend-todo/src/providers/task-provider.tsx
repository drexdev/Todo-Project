import { useState } from "react";
import { Task } from "../@types/task";
import { TaskUseProvider } from "../contexts/task-context";

export default function TaskProvider({ children }: { children: React.ReactNode }) {
    const [tasks, setTasks] = useState<Task[]>([]);

    return <TaskUseProvider value={{}}>{children}</TaskUseProvider>;
}