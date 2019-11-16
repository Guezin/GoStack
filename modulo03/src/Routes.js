import { Router } from 'express'

import multer from 'multer'
import configMulter from './config/multer'

import UserController from './app/controllers/UserController'
import LoginController from './app/controllers/LoginController'
import authMiddleware from './app/middlewares/auth'

class Routes {
    constructor() {
        this.route = new Router()
        this.upload = multer(configMulter)

        this.login()

        this.getUsers()
        this.postUser()

        this.middlewares()

        this.updateUser()
        this.uploadFiles()
    }

    login() {
        this.route.post('/login', LoginController.store)
    }

    middlewares() {
        this.route.use(authMiddleware)
    }

    getUsers() {
        this.route.get('/users', UserController.index)
    }

    postUser() {
        this.route.post('/users', UserController.store)
    }

    updateUser() {
        this.route.put('/users', UserController.update)
    }

    uploadFiles() {
        this.route.post('/files', this.upload.single('file'), (req, res) => res.json({ ok: true }))
    }
}

export default new Routes().route