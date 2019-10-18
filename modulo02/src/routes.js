import { Router } from 'express'
import UserController from './app/controllers/UserController'

class Routes {
    constructor() {
        this.routes = Router()

        this.getUsers()
        this.postUsers()
    }

    getUsers() {
        this.routes.get('/users', UserController.index)
    }

    postUsers() {
        this.routes.post('/users', UserController.store)
    }
}

export default new Routes().routes