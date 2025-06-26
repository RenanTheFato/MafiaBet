import { FastifyReply, FastifyRequest } from "fastify";
import { CreateUserService } from "../../services/users/create-user-service.js";
import { hash } from "bcryptjs";
import { z } from "zod";

export class CreateUserController {
  async handle(req: FastifyRequest, rep: FastifyReply) {

    const validateUserSchema = z.object({
      email: z.string()
        .email({ message: "The value has entered isn't a email or the email is invalid." })
        .min(2, { message: "The email doesn't meet the minimum number of characters (2)." }),
      password: z.string()
        .min(8, { message: "The password doesn't meet the minimum number of characters (8)." })
        .max(128, { message: "The password has exceeded the character limit (128)." })
        .refine((password) => /[A-Z]/.test(password), { message: "Password must contain at least one uppercase letter." })
        .refine((password) => /[0-9]/.test(password), { message: "Password must contain at least one number." })
        .refine((password) => /[@#$*&]/.test(password), { message: "Password must contain at least one of this special characters ('@' '#' '$' '*' '&')." }),
      username: z.string()
        .min(1, { message: "The username doesn't meet the minimum number of characters (1)." })
        .max(128, { message: "The username has exceeded the character limit (128)." })
    })

    const { email, password, username } = req.body as z.infer<typeof validateUserSchema>

    try {
      validateUserSchema.parse(req.body)
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

    const hashedPassword = await hash(password, 10)

    try {
      const createUserService = new CreateUserService()
      await createUserService.execute({ email, password: hashedPassword, username })

      return rep.status(201).send({ message: "User Created" })
    } catch (error: any) {
      return rep.status(400).send({ error: error.message })
    }

  }

}