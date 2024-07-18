import { Task } from "../interfaces/tasks.interface";

export class TasksService {
    private tasks: Task[] = [];

    constructor() {}

    getTasks(): Task[] {
        return this.tasks;
    }

    async createTask(task: Task): Promise<string | string[]> {
        return "Task criada com sucesso!";
    }
}
