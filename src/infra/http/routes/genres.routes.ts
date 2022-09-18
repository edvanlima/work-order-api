import { Router } from 'express'
import { CreateGenreController } from '../../../modules/genres/useCases/createGenre/CreateGenreController'
import { ListGenresController } from '../../../modules/genres/useCases/listGenre/ListGenresController'
import { ensureAdmin } from '../middlewares/ensureAdmin'
import { ensureAuthenticated } from '../middlewares/ensureAuthenticated'

const genreRoutes = Router()

const createGenreController = new CreateGenreController()
const listGenresController = new ListGenresController()

genreRoutes.post(
  '/',
  ensureAuthenticated,
  ensureAdmin,
  createGenreController.handler,
)

genreRoutes.get('/', listGenresController.handler)

export { genreRoutes }
