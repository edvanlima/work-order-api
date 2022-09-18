import { compare } from 'bcrypt'
import jwt from 'jsonwebtoken'
import { inject, injectable } from 'tsyringe'
import { AppError } from '../../../../infra/http/errors/app-error'

import { IUsersRepository } from '../../repositories/IUsersRepository'

interface IResponse {
  user: { name: string; email: string }
  token?: string
}

@injectable()
class AuthenticateUserUseCase {
  constructor(
    @inject('UsersRepository')
    private usersRepository: IUsersRepository,
  ) {}

  async execute(email: string, password: string) {
    const user = await this.usersRepository.findByEmail(email)

    if (!user) {
      throw new AppError(`Email or password not incorrect!`)
    }

    const passwordMatch = await compare(password, user.password)

    if (!passwordMatch) {
      throw new AppError(`Email or password incorrect!`)
    }

    var privateKey = 'ba26cd0b54ddc386c002fb6b35cf037e'
    var token = jwt.sign({ subject: user.id, expiresIn: '1d' }, privateKey, {
      //   algorithm: "RS256",
    })

    const tokenResponse: IResponse = {
      user: {
        name: user.name,
        email,
      },
      token: token,
    }

    return tokenResponse
  }
}

export { AuthenticateUserUseCase }
