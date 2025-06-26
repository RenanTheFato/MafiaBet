import { FastifyReply, FastifyRequest, FastifyInstance } from "fastify";
import { CreateUserController } from "../controllers/users/create-user-controller.js";

export async function userRoutes(fastify: FastifyInstance) {
  fastify.get("/ping", async (req: FastifyRequest, rep: FastifyReply) => {
    return rep.status(200).send({ message: "pong" })
  })
  
  fastify.post("/create-user", async (req: FastifyRequest, rep: FastifyReply) => {
    return new CreateUserController().handle(req, rep)
  })
}