import { Request, Response } from 'express'
import { container } from 'tsyringe'
import { CreateGenreUserCase } from './CreateGenreUserCase'

class CreateGenreController {
  async handler(req: Request, res: Response) {
    const { name } = req.body

    const createGenreUserCase = container.resolve(CreateGenreUserCase)

    const genre = await createGenreUserCase.execute(name)

    return res.status(200).json(genre)
  }
}

export { CreateGenreController }
