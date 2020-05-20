import { Router } from 'express'

import AppointmentsController from '../controller/AppointmentsController'

const appointmentsRouter = Router()
const appointmentsController = new AppointmentsController()

appointmentsRouter.get('/', appointmentsController.index)

appointmentsRouter.post('/', appointmentsController.create)

export default appointmentsRouter
