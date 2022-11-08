import { FastifyInstance } from "fastify";

export default async function (fastify: FastifyInstance) {
  fastify.get("/", { websocket: true }, (ss) => {
    ss.socket.on("message", () => {
      ss.socket.send("Got a message at " + Date.now());
    });
  });
}
