import { BadRequest } from "../errors/BadRequest";
import { Task } from "../interfaces/tasks.interface";
import { TasksService } from "./tasks.service";

describe("Tasks Service", () => {
  let tasksService: TasksService;

  // Criando um novo TaskService;
  beforeEach(() => {
    tasksService = new TasksService();
  });

  // Utilizado para obter todas as tarefas;
  it("mostrar todas as tarefas", () => {
    const tasks = tasksService.getTasks();
    expect(tasks).toEqual([]);
  });

  // Utilizado para criar uma nova tarefa;
  it("criar, atualizar e deletar uma tarefa", async () => {
    // Criar uma nova tarefa
    const task: Task = {
      title: "Tarefa 1",
      description: "Descrição da tarefa 1",
      status: "todo",
    };

    const replyFastifyCreate: any = {
      status: jest.fn().mockReturnThis(),
      send: jest.fn(),
    };

    await tasksService.createTask(task, replyFastifyCreate);

    // Verificar criação da tarefa
    expect(replyFastifyCreate.status).toHaveBeenCalledWith(201);
    expect(replyFastifyCreate.send).toHaveBeenCalledWith({
      statusCode: 201,
      message: "Tarefa criada com sucesso!",
    });

    // Atualizar a tarefa criada
    const tasks = tasksService.getTasks();
    const id = tasks[0].id as number;

    const updatedTask: Task = {
      title: "Tarefa alterada",
      description: "Descrição da tarefa alterada",
      status: "done",
    };

    const replyFastifyUpdate: any = {
      status: jest.fn().mockReturnThis(),
      send: jest.fn(),
    };

    await tasksService.updateTask(id, updatedTask, replyFastifyUpdate);

    // Verificar atualização da tarefa
    expect(replyFastifyUpdate.status).toHaveBeenCalledWith(200);
    expect(replyFastifyUpdate.send).toHaveBeenCalledWith({
      statusCode: 200,
      message: "Tarefa atualizada com sucesso!",
    });

    // Verificar se a tarefa atualizada está na lista de tarefas
    expect(tasksService.getTasks()).toContainEqual(
      expect.objectContaining(updatedTask)
    );

    // Deletar a tarefa atualizada
    const replyFastifyDelete: any = {
      status: jest.fn().mockReturnThis(),
      send: jest.fn(),
    };

    await tasksService.deleteTask(id, replyFastifyDelete);

    // Verificar exclusão da tarefa
    expect(replyFastifyDelete.status).toHaveBeenCalledWith(204);
    expect(replyFastifyDelete.send).toHaveBeenCalledWith({
      statusCode: 204,
    });

    // Verificar se a tarefa foi removida da lista de tarefas
    expect(tasksService.getTasks().findIndex((t) => t.id === id)).toBe(-1);
  });

  // Verificar se a validação da tarefa falha ao não informar o campo title
  it("deve lançar BadRequest caso a validação da tarefa falhe", async () => {
    const task: Task = {
      title: "", // Titulo vazio para validação
      description: "Descrição da tarefa 1",
      status: "todo",
    };

    const replyFastifyCreate: any = {
      status: jest.fn().mockReturnThis(),
      send: jest.fn(),
    };

    // Verificar se a validação da tarefa falhou
    await expect(
      tasksService.createTask(task, replyFastifyCreate)
    ).rejects.toThrow(BadRequest);
  });
});
