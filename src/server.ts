import { fastify } from "fastify";
import { config } from "dotenv";
import cors from "@fastify/cors";
import { routes } from "./infra/routes/index.js";

config()
const app = fastify({ logger: true })

async function start() {

  const HOST = process.env.HTTP_HOST
  const PORT = process.env.HTTP_PORT

  await app.register(cors)
  await app.register(routes)
  
  await app.listen({
    host: String(HOST) || "0.0.0.0",
    port: Number(PORT) || 3333
  }).then(() => {
    console.log(`HTTP SERVER RUNNING: PORT ${PORT}`)
  }).catch((error) => {
    console.error(`Error when trying to running the HTTP server. Error: ${error}`)
    process.exit(1)
  })
}

start()