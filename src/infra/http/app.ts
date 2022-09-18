// import cors from 'cors'
import { config } from 'dotenv-flow'
import express from 'express'
import 'reflect-metadata'
import 'express-async-errors'
import '../../container'
import { AppError } from './errors/app-error'

config({ silent: true })

import { routes } from './routes' // eslint-disable-line

const app = express()

app.use(express.json())

// app.use(
//   cors({
//     exposedHeaders: ['x-total-count', 'Content-Type', 'Content-Length'],
//   }),
// )

app.use(
  express.json({
    type: ['application/json', 'text/plain'],
  }),
)

app.use(routes)

app.use(
  (
    err: Error,
    req: express.Request,
    res: express.Response,
    next: express.NextFunction,
  ) => {
    if (err instanceof AppError) {
      return res.status(err.statusCode).json({ message: err.message })
    }
    return res.status(500).json({
      status: 'error',
      message: `Internal Server Error - ${err.message}}`,
    })
  },
)

export { app }
