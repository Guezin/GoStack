import express, { json, static } from 'express'
import { resolve } from 'path'
import * as Sentry from '@sentry/node'
import Youch from 'youch'
import 'express-async-errors'
import './database/connectionDB'

import sentryConfig from './config/sentry'
import Routes from './Routes'

class Server {
    constructor() {
        this.server = express()
        this.PORT = 3333

        Sentry.init(sentryConfig)

        this.middlewares()
        this.routes()
        this.exceptionHandler()
        
        this.upServer()
    }
    
    upServer() {
        this.server.listen(this.PORT, console.log(`Server running: http://localhost:${this.PORT}`))
    }
    
    middlewares() {
        this.server.use(Sentry.Handlers.requestHandler())
        this.server.use(json())
        this.server.use('/files', static(resolve(__dirname, '..', 'tmp', 'uploads')))
    }

    routes() {
        this.server.use(Routes)
        this.server.use(Sentry.Handlers.errorHandler())
    }

    exceptionHandler() {
        this.server.use(async (err, req, res, next) => {
            const errors = await new Youch(err, req).toJSON()

            return res.status(500).json(errors)
        })
    }
}

export default new Server().server