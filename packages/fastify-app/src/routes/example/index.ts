import { FastifyInstance } from "fastify";

export default async function (fastify: FastifyInstance) {
  fastify.get("/", (req, reply) => {
    reply.badRequest();
  });
}
