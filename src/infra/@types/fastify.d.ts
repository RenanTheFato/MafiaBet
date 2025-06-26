import "fastify";

declare module "fastify" {
  export interface FastifyRequest {
    user: Partial<{
      id: string
      email: string
      password: string
      username: string
      balanceInCents: number
      createdAt: Date
      updatedAt: Date
    }>
  }
}