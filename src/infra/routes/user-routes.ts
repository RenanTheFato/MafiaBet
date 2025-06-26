import { FastifyReply, FastifyRequest, FastifyInstance } from "fastify";
import { CreateUserController } from "../controllers/users/create-user-controller.js";
import { AuthorizationUserController } from "../controllers/users/auth-user-controller.js";
import { authorization } from "../middlewares/authorization-middleware.js";
import { ViewUserInfoController } from "../controllers/users/view-user-info-controller.js";

export async function userRoutes(fastify: FastifyInstance) {
  fastify.get("/ping", async (req: FastifyRequest, rep: FastifyReply) => {
    return rep.status(200).send({ message: "pong" })
  })

  fastify.get("/user", { preHandler: [authorization] }, async (req: FastifyRequest, rep: FastifyReply) => {
    return new ViewUserInfoController().handle(req, rep)
  })

  fastify.post("/create-user", async (req: FastifyRequest, rep: FastifyReply) => {
    return new CreateUserController().handle(req, rep)
  })

  fastify.post("/auth-user", async (req: FastifyRequest, rep: FastifyReply) => {
    return new AuthorizationUserController().handle(req, rep)
  })
}