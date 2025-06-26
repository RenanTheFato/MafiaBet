export interface User {
  id: string
  email: string
  password: string
  username: string
  role: string
  balanceInCents: number
  createdAt: Date
  updatedAt: Date
}