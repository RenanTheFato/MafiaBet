import { User } from "../../@types/user-types.js";
import { prisma } from "../../config/prisma.js";

export class ViewUserInfoService {
  async execute({ id }: Pick<User, 'id'>) {
    if (!id) {
      throw new Error("The id has not provided.")
    }

    const user = await prisma.users.findUnique({
      where: {
        id,
      },
      omit: {
        password: true,
      },
    })

    if (!user) {
      throw new Error("Unable to fetch user data.")
    }

    return user
  }
}