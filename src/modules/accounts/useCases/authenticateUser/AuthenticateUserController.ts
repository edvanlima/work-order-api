import { Request, Response } from 'express'
import { container } from 'tsyringe'
import { AuthenticateUserUseCase } from './AuthenticateUserUseCase'

class AuthenticateUserController {
  async handler(request: Request, response: Response) {
    const { email, password } = request.body

    const authenticateUseCase = container.resolve(AuthenticateUserUseCase)

    const tokenResponse = await authenticateUseCase.execute(email, password)

    return response.json(tokenResponse)
  }
}

export { AuthenticateUserController }
