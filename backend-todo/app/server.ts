import fastify, { FastifyInstance } from "fastify";
import { taskRoutes } from "./routes/tasks.routes";

const app: FastifyInstance = fastify();

app.register(taskRoutes, {
    prefix: "/tasks",
});

const port = 3000;

app.listen({ port }).then(() => {
  console.log("Servidor iniciado na porta: " + port);
});
