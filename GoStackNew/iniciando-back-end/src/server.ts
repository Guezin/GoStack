import 'reflect-metadata'
import express, { json } from 'express'
import cors from 'cors'
import 'express-async-errors'

import './database'

import routes from './routes'
import uploadConfig from './config/upload'
import middlewareError from './middlewares/error'

const server = express()

server.use(json())
server.use('/files', express.static(uploadConfig.directory))
server.use(cors())
server.use(routes)
server.use(middlewareError)

server.listen(3333, () => console.log('Server started on port 3333.'))

export default server
