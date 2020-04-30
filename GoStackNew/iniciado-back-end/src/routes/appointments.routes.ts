import { Router } from 'express'
import { parseISO } from 'date-fns'
import { getCustomRepository } from 'typeorm'

import AppointmentsController from '../controllers/AppointmentsController'
import CreateAppointmentService from '../services/CreateAppointmentService'

const appointmentsRouter = Router()

appointmentsRouter.get('/', async (request, response) => {
  const appointmentController = getCustomRepository(AppointmentsController)
  const appointmentsAll = await appointmentController.find()

  return response.json(appointmentsAll)
})

appointmentsRouter.post('/', async (request, response) => {
  try {
    const { provider, date } = request.body

    const parsedDate = parseISO(date)

    const createAppointment = new CreateAppointmentService()

    const appointment = await createAppointment.execute({
      provider,
      date: parsedDate
    })

    return response.json(appointment)
  } catch (err) {
    return response.status(400).json({ error: err.message })
  }
})

export default appointmentsRouter
