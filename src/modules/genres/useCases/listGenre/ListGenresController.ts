import { Request, Response } from 'express'
import { container } from 'tsyringe'
import { ListGenresUseCase } from './ListGenresUseCase'

class ListGenresController {
  async handler(req: Request, res: Response) {
    const listGenresUseCase = container.resolve(ListGenresUseCase)

    const genres = await listGenresUseCase.execute()

    return res.status(200).json(genres)
  }
}
export { ListGenresController }
