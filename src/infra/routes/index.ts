import { FastifyInstance } from "fastify";
import { userRoutes } from "./user-routes.js";

export async function routes(fastify: FastifyInstance) {
  await userRoutes(fastify)  
}