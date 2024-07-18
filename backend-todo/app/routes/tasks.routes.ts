import { FastifyInstance } from "fastify";
import { TasksService } from "../services/tasks.service";
import { Task } from "../interfaces/tasks.interface";

const tasksService = new TasksService();

export async function taskRoutes(fastify: FastifyInstance) {

    fastify.get("/", async (request, reply) => {
        return tasksService.getTasks();
    });

    fastify.post<{ Body: Task }>("/", async (request) => {
        return tasksService.createTask(request.body);
    });
}