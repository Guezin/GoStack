import express, { json, static } from 'express'
import { resolve } from 'path'

import Routes from './Routes'
import './database/connectionDB'

class Server {
    constructor() {
        this.server = express()
        this.PORT = 3333

        this.middlewares()
        this.routes()

        this.upServer()
    }

    upServer() {
        this.server.listen(this.PORT, console.log(`Server running: http://localhost:${this.PORT}`))
    }

    middlewares() {
        this.server.use(json())
        this.server.use('/files', static(resolve(__dirname, '..', 'tmp', 'uploads')))
    }

    routes() {
        this.server.use(Routes)
    }
}

export default new Server().server