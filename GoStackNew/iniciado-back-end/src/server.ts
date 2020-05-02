import 'reflect-metadata'
import express, { json } from 'express'

import './database'

import routes from './routes'
import uploadConfig from './config/upload'

const server = express()

server.use(json())
server.use('/files', express.static(uploadConfig.directory))
server.use(routes)

server.listen(3333, () => console.log('Server started on port 3333.'))

export default server
