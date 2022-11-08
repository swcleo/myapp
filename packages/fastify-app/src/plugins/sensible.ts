import fp from "fastify-plugin";
import FastifySensible from "@fastify/sensible";

export default fp(async function (fastify) {
  fastify.register(FastifySensible);
});
