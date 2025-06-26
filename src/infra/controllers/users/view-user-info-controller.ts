import { FastifyReply, FastifyRequest } from "fastify";
import { ViewUserInfoService } from "../../services/users/view-user-info-service.js";

export class ViewUserInfoController{
  async handle(req: FastifyRequest, rep: FastifyReply){

    const id = req.user.id as string

    if (!id) {
      return rep.status(401).send({ message: "The id cannot be empty" })
    }

    try {
      const viewUserInfoService = new ViewUserInfoService()
      const user = await viewUserInfoService.execute({ id })

      return rep.status(200).send({ message: "User Fetched", user })
    } catch (error: any) {
      return rep.status(400).send({ error: error.message })
    }

  }
}