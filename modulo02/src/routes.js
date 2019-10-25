import { Router } from 'express'

import UserController from './app/controllers/UserController'
import SessionController from './app/controllers/SessionController'
import authMiddleware from './app/middlewares/auth'

class Routes {
    constructor() {
        this.routes = Router()

        
        this.getUsers()
        this.postUsers()

        this.middlewares()

        this.putUsers()

        this.sessionUser()
    }

    middlewares() {
        this.routes.use(authMiddleware)
    }

    getUsers() {
        this.routes.get('/users', UserController.index)
    }

    postUsers() {
        this.routes.post('/users', UserController.store)
    }

    putUsers() {
        this.routes.put('/users', UserController.update)
    }

    sessionUser() {
        this.routes.post('/session', SessionController.store)
    }

}

export default new Routes().routes