import { container } from 'tsyringe'
import { GenresRepository } from './modules/genres/repositories/GenresRepository'
import { IGenresRepository } from './modules/genres/repositories/IGenresRepository'
import { IUsersRepository } from './modules/users/repositories/IUsersRepository'
import { UsersRepository } from './modules/users/repositories/UsersRepository'

container.registerSingleton<IUsersRepository>(
  'UsersRepository',
  UsersRepository,
)

container.registerSingleton<IGenresRepository>(
  'GenresRepository',
  GenresRepository,
)
