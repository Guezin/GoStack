import { Router } from 'express'
import { parseISO } from 'date-fns'

import AppointmentsRepository from '@modules/appointments/infra/typeorm/repositories/AppointmentsRepository'
import CreateAppointmentService from '@modules/appointments/services/CreateAppointmentService'

const appointmentsRouter = Router()
const appointmentsRepository = new AppointmentsRepository()

// appointmentsRouter.get('/', async (request, response) => {
//   const appointmentsAll = await appointmentRepository.find()

//   return response.json(appointmentsAll)
// })

appointmentsRouter.post('/', async (request, response) => {
  const { provider_id, date } = request.body

  const parsedDate = parseISO(date)

  const createAppointment = new CreateAppointmentService(appointmentsRepository)

  const appointment = await createAppointment.execute({
    provider_id,
    date: parsedDate
  })

  return response.json(appointment)
})

export default appointmentsRouter
