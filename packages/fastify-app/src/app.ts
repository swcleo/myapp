import Fastify from "fastify";
import AutoLoad from "@fastify/autoload";
import path from "path";
import fs from "fs";
import dotenv from "dotenv";
import { v4 as uuidv4 } from "uuid";
import pino from "pino";

if (fs.existsSync(".env")) {
  dotenv.config({ path: ".env" });
}

const HOST = process.env.HOST || "127.0.0.1";
const PORT = (process.env.PORT && +process.env.PORT) || 3000;

const logger = pino();

const fastify = Fastify({
  logger,
  genReqId() {
    return uuidv4();
  },
});

// plugins
fastify.register(AutoLoad, {
  dir: path.join(__dirname, "plugins"),
  options: {},
});

// routes
fastify.register(AutoLoad, {
  dir: path.join(__dirname, "routes"),
  options: {},
});

fastify.listen({ port: PORT, host: HOST }, (err, address) => {
  if (err) {
    console.error(err);
    process.exit(1);
  }
  console.log(`Server listening at ${address}`);
});
