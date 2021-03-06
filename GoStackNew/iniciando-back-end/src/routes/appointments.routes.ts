import { Router } from 'express'
import { parseISO } from 'date-fns'
import { getCustomRepository } from 'typeorm'

import AppointmentsRepository from '../repositories/AppointmentsRepository'
import CreateAppointmentService from '../services/CreateAppointmentService'

const appointmentsRouter = Router()

appointmentsRouter.get('/', async (request, response) => {
  const appointmentRepository = getCustomRepository(AppointmentsRepository)
  const appointmentsAll = await appointmentRepository.find()

  return response.json(appointmentsAll)
})

appointmentsRouter.post('/', async (request, response) => {
  const { provider_id, date } = request.body

  const parsedDate = parseISO(date)

  const createAppointment = new CreateAppointmentService()

  const appointment = await createAppointment.execute({
    provider_id,
    date: parsedDate
  })

  return response.json(appointment)
})

export default appointmentsRouter
