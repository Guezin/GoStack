import { Router } from 'express'
import { startOfHour, parseISO } from 'date-fns'

import AppointmentsController from '../controllers/AppointmentsController'

const appointmentsRouter = Router()

const appointmentController = new AppointmentsController()

appointmentsRouter.get('/', (request, response) => {
  const appointmentsAll = appointmentController.all()

  return response.json(appointmentsAll)
})

appointmentsRouter.post('/', (request, response) => {
  const { provider, date } = request.body

  const parsedDate = startOfHour(parseISO(date))

  const findAppointmentsInSameDate = appointmentController.findByDate(
    parsedDate
  )

  if (findAppointmentsInSameDate) {
    return response
      .status(401)
      .json({ error: 'This appointment already booked' })
  }

  const appointment = appointmentController.create(provider, parsedDate)

  return response.json(appointment)
})

export default appointmentsRouter
