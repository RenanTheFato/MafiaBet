import { FastifyReply, FastifyRequest } from "fastify";
import { AuthorizationUserService } from "../../services/users/auth-user-service.js";
import { z } from "zod";

export class AuthorizationUserController {
  async handle(req: FastifyRequest, rep: FastifyReply) {

    const validateAuthSchema = z.object({
      email: z.string({ message: "The value entered isn't a string type." })
        .email({ message: "The value entered isn't an e-mail or the e-mail is invalid." })
        .nonempty({ message: "The email value cannot be empty." }),
      password: z.string({ message: "The value entered isn't a string type." })
        .nonempty({ message: "The password value cannot be empty." })
    })

    try {
      validateAuthSchema.parse(req.body)
    } catch (error) {
      if (error instanceof z.ZodError) {
        const errors = error.errors.map((err) => ({
          code: err.code,
          message: err.message,
          path: err.path.join("/")
        }))

        return rep.status(400).send({ statusCode: 400, code: errors[0].code, error: "Bad Request", message: errors[0].message, field: errors[0].path })
      }
    }

    const { email, password } = req.body as z.infer<typeof validateAuthSchema>

    try {
      const authorizationUserService = new AuthorizationUserService()

      const token = await authorizationUserService.execute({ email, password })
      return rep.status(200).send({ token })
    } catch (error: any) {
      return rep.status(401).send({ error: error.message })
    }

  }
}