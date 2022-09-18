import { Request, Response, NextFunction } from 'express'

import { UsersRepository } from '../../../modules/users/repositories/UsersRepository'
import { AppError } from '../errors/app-error'


export async function ensureAdmin(
  req: Request,
  res: Response,
  next: NextFunction,
) {
  const user_id = req.user.id

  const usersRepository = new UsersRepository()

  const user = await usersRepository.findById(user_id)

  if (!user.isAdmin) {
    throw new AppError(`User is not a administrator!`, 401)
  }

  return next()
}
