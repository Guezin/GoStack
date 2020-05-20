import 'reflect-metadata'
import express, { json } from 'express'
import cors from 'cors'
import 'express-async-errors'

import routes from './routes'
import uploadConfig from '@config/upload'
import middlewareError from '@modules/users/infra/http/middlewares/error'

import '../typeorm/database'
import '@shared/container'

const server = express()

server.use(cors())
server.use(json())
server.use('/files', express.static(uploadConfig.directory))
server.use(routes)
server.use(middlewareError)

server.listen(3333, () => console.log('Server started on port 3333.'))

export default server
