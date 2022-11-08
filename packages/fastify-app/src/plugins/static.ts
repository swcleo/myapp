import fp from "fastify-plugin";
import FastifyStatic from "@fastify/static";
import path from "path";

export default fp(async function (fastify) {
  fastify.register(FastifyStatic, {
    root: path.join(__dirname, "../public"),
    prefix: "/public/",
  });
});
