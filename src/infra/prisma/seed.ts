import { hash } from 'bcrypt'
import prismaClient from './client'

async function main() {
  const passwordHash = await hash('admin', 8)

  const user = {
    name: 'admin',
    email: 'admin@movies.com',
    isAdmin: true,
  }

  await prismaClient.user.create({
    data: {
      name: user.name,
      email: user.email,
      password: passwordHash,
      isAdmin: user.isAdmin,
    },
  })
}
main()
