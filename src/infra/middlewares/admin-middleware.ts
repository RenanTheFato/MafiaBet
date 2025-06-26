import { FastifyReply, FastifyRequest } from "fastify";

export function checkPermissions(req: FastifyRequest, rep: FastifyReply) {

  const role = req.user.role as string

  if (role === "ADMIN") {
    return
  }

  return rep.status(403).send({ error: "Not allowed to proceed." })

}