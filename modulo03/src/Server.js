import express, { json } from 'express'

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
    }

    routes() {
        this.server.use(Routes)
    }
}

export default new Server().server