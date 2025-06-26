import { prisma } from "../../config/prisma.js";
import { User } from "../../@types/user-types.js";

export class CreateUserService {
  async execute({ email, password, username }: Pick<User, 'email' | 'password' | 'username'>) {

    const isEmailAlreadyExists = await prisma.users.count({
      where: {
        email,
      },
    })

    if (isEmailAlreadyExists > 0) {
      throw new Error("The email is already in use")
    }

    await prisma.users.create({
      data: {
        email,
        password,
        username
      }
    })

  }
}