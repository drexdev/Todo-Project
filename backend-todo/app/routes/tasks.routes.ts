import { FastifyInstance } from "fastify";
import { TasksService } from "../services/tasks.service";
import { Task } from "../interfaces/tasks.interface";

const tasksService = new TasksService();

export async function taskRoutes(fastify: FastifyInstance) {
  fastify.get("/", async (request, reply) => {
    return tasksService.getTasks();
  });

  fastify.post<{ Body: Task }>("/", async (request, reply) => {
    return tasksService.createTask(request.body, reply);
  });

  fastify.put<{
    Body: Task;
    Params: { id: number };
  }>("/:id", async (request, reply) => {
    return tasksService.updateTask(request.params.id, request.body, reply);
  });

  fastify.delete<{ Params: { id: number } }>("/:id", async (request, reply) => {
    return tasksService.deleteTask(request.params.id, reply);
  });
}
