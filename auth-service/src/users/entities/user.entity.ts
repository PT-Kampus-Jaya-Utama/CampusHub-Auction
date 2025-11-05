export class User {
  id: string
  username: string
  password: string
  createdAt: Date

  constructor(partial: Partial<User>) {
    Object.assign(this, partial)
  }
}
