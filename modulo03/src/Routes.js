import { Router } from 'express'

import multer from 'multer'
import configMulter from './config/multer'

import authMiddleware from './app/middlewares/auth'
import UserController from './app/controllers/UserController'
import FileController from './app/controllers/FileController'
import LoginController from './app/controllers/LoginController'
import ProviderController from './app/controllers/ProviderController'
import AppointmentController from './app/controllers/AppointmentController'
import ScheduleController from './app/controllers/ScheduleController'

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
        this.getProviders()
        this.getAppointment()
        this.postAppointment()
        this.scheduleProviders()

    }

    login() {
        return this.route.post('/login', LoginController.store)
    }

    middlewares() {
        return this.route.use(authMiddleware)
    }

    getUsers() {
        return this.route.get('/users', UserController.index)
    }

    postUser() {
        return this.route.post('/users', UserController.store)
    }

    updateUser() {
        return this.route.put('/users', UserController.update)
    }

    uploadFiles() {
        return this.route.post('/files', this.upload.single('file'), FileController.store)
    }

    getProviders() {
        return this.route.get('/providers', ProviderController.index)
    }

    getAppointment() {
        return this.route.get('/appointments', AppointmentController.index)
    }
    
    postAppointment() {
        return this.route.post('/appointments', AppointmentController.store)
    }

    scheduleProviders() {
        return this.route.get('/schedule', ScheduleController.index)
    }

}

export default new Routes().route