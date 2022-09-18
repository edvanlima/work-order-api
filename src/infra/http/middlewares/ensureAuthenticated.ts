import { Request, Response, NextFunction } from 'express'
import { verify } from 'jsonwebtoken'
import { UsersRepository } from '../../../modules/users/repositories/UsersRepository'
import { AppError } from '../errors/app-error'

interface IPayload {
  sub: string
}

export async function ensureAuthenticated(
  req: Request,
  res: Response,
  next: NextFunction,
) {
  const authHeader = req.headers.authorization

  if (!authHeader) {
    throw new AppError('Token is missing', 401)
  }

  const [, token] = authHeader.split(' ')

  const { sub: user_ìd } = verify(
    token,
    'ba26cd0b54ddc386c002fb6b35cf037e',
  ) as IPayload

  const usersRepository = new UsersRepository()

  const user = await usersRepository.findById(user_ìd)

  if (!user) {
    throw new AppError('token invalid', 401)
  }
  req.user = {
    id: user_ìd,
  }

  next()
}
