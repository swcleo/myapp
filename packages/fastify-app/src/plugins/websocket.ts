import fp from "fastify-plugin";
import FastifyWebSocket from "@fastify/websocket";

export default fp(async function (fastify) {
  fastify.register(FastifyWebSocket);
});
