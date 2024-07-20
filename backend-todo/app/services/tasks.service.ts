import { plainToClass } from "class-transformer";
import { validate } from "class-validator";

import { Task } from "../interfaces/tasks.interface";
import { FastifyReply } from "fastify";

import { BadRequest } from "../errors/BadRequest";
import { NotFound } from "../errors/NotFound";

export class TasksService {
  private tasks: Task[] = [];

  constructor() {}

  /**
   * Utilizado para obter todas as tarefas.
   */
  getTasks(): Task[] {
    return this.tasks;
  }

  /**
   * Utilizado para criar uma nova tarefa.
   */
  async createTask(task: Task, reply: FastifyReply): Promise<void> {
    const taskIntance = plainToClass(Task, task);
    const validationErrors = await validate(taskIntance);

    // Verifica se o objeto de validação retornou erros;
    if (validationErrors.length > 0) {
      const errorMessages = validationErrors.map((error) => {
        return Object.values(error.constraints || {}).join(", ");
      });

      // Enviar as validações de erros para o cliente;
      throw new BadRequest(errorMessages);
    }

    task.id = Date.now(); // Gera um ID para a nova tarefa;
    if (!task.status) task.status = "todo";

    this.tasks.push(task);

    return reply.status(201).send({
      statusCode: 201,
      message: "Tarefa criada com sucesso!"
    });
  }

  /**
   * Utilizado para atualizar as informações de uma tarefa.
   */
  async updateTask(id: number, task: Task, reply: FastifyReply): Promise<void> {
    if (!id) {
      throw new BadRequest("O ID da tarefa deve ser informado.");
    }

    const taskIndex = this.tasks.findIndex((task) => task.id === Number(id)); // Procura a tarefa pelo ID informado;

    if (taskIndex === -1) {
      // Verifica se a tarefa foi encontrada
      throw new NotFound("Tarefa inexistente.");
    }

    if (!task) {
      // Caso o body de envio esteja vazio.
      throw new BadRequest("O campo de alteração deve ser informado.");
    }

    const getTask = this.tasks[taskIndex];

    // Atualiza as informações da tarefa
    getTask.title = task.title || getTask.title;
    getTask.description = task.description || getTask.description;
    getTask.status = task.status || getTask.status;

    return reply.status(200).send({
      statusCode: 200,
      message: "Tarefa atualizada com sucesso!",
    });
  }

  /**
   * Utilizado para deletar uma tarefa pelo ID.
   */
  async deleteTask(id: number, reply: FastifyReply): Promise<void> {
    if (!id) {
      throw new BadRequest("O ID da tarefa deve ser informado.");
    }

    const taskIndex = this.tasks.findIndex((task) => task.id === Number(id)); // Procura a tarefa pelo ID informado;

    if (taskIndex === -1) {
      // Verifica se a tarefa foi encontrada
      throw new NotFound("Tarefa inexistente.");
    }

    this.tasks.splice(taskIndex, 1); // Remove a tarefa do array;

    return reply.status(204).send({
      statusCode: 204,
    });
  }
}
