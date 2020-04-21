import { Router } from 'express'
import { parseISO } from 'date-fns'

import AppointmentsController from '../controllers/AppointmentsController'
import CreateAppointmentService from '../services/CreateAppointmentService'

const appointmentsRouter = Router()

const appointmentController = new AppointmentsController()

appointmentsRouter.get('/', (request, response) => {
  const appointmentsAll = appointmentController.all()

  return response.json(appointmentsAll)
})

appointmentsRouter.post('/', (request, response) => {
  try {
    const { provider, date } = request.body

    const parsedDate = parseISO(date)

    const createAppointment = new CreateAppointmentService(
      appointmentController
    )

    const appointment = createAppointment.execute({
      provider,
      date: parsedDate
    })

    return response.json(appointment)
  } catch (err) {
    return response.status(400).json({ error: err.message })
  }
})

export default appointmentsRouter
