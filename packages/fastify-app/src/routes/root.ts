import { FastifyInstance } from "fastify";
import path from "path";

export default async function (fastify: FastifyInstance) {
  fastify.get("/", (req, reply) => {
    reply.sendFile("index.html", path.join(__dirname, "../public"));
  });
}
