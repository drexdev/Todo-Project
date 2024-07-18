import fastify, { FastifyInstance } from 'fastify';

const app: FastifyInstance = fastify();

app.get('/', async () => {
    return {
        message: 'Hello, World!',
    };
});

const port = 3000;

app.listen({ port }).then(() => {
    console.log("Servidor iniciado na porta: " + port);
});