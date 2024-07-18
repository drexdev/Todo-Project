import fastify, { FastifyError, FastifyInstance } from "fastify";
import { taskRoutes } from "./routes/tasks.routes";
import { WebError } from "./errors/WebError";

const app: FastifyInstance = fastify();

app.setErrorHandler(function (error: FastifyError, _, reply) {
  if (error instanceof WebError) {
    reply.status(error.statusCode).send({
      statusCode: error.statusCode,
      message: error.messages,
    });
  } else {
    reply.send(error);
  }
});

app.register(taskRoutes, {
  prefix: "/tasks",
});

const port = 3000;

app.listen({ port }).then(() => {
  console.log("Servidor iniciado na porta: " + port);
});