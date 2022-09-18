import { Response } from 'express'
import { Genre } from '@prisma/client'

import { IGenresRepository } from './IGenresRepository'
import prismaClient from '../../../infra/prisma/client'

class GenresRepository implements IGenresRepository {
  async create(name: string) {
    const genre = await prismaClient.genre.create({
      data: { name },
    })

    return genre
  }
  async findByName(name: string) {
    const genre = await prismaClient.genre.findFirst({
      where: { name },
    })

    return genre as Genre
  }
  async list() {
    const genres = await prismaClient.genre.findMany()

    return genres
  }
}

export { GenresRepository }
