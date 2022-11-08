import fp from "fastify-plugin";
import FastifyStatic from "@fastify/static";
import path from "path";

export default fp(async function (fastify) {
  // app
  fastify.register(FastifyStatic, {
    root: path.join(__dirname, "../public"),
    prefix: "/public/",
  });

  // angular
  fastify.register(FastifyStatic, {
    root: path.join(__dirname, "../angular"),
    prefix: "/angular/",
    decorateReply: false,
  });

  // vue
  fastify.register(FastifyStatic, {
    root: path.join(__dirname, "../vue"),
    prefix: "/vue/",
    decorateReply: false,
  });
});
