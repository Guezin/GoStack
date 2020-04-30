/**
 * 1 - Recebimento das informaçoes
 * 2 - Tratativa de erros/ excessões
 * 3 - Acesso ao Controller
 */

import { startOfHour } from 'date-fns'
import { getCustomRepository } from 'typeorm'

import Appointment from '../models/Appointment'
import AppointmentsController from '../controllers/AppointmentsController'

interface RequestDTO {
  provider_id: string
  date: Date
}

class CreateAppointmentService {
  public async execute({
    provider_id,
    date
  }: RequestDTO): Promise<Appointment> {
    const appointmentsController = getCustomRepository(AppointmentsController)
    const appointmentDate = startOfHour(date)
    const findAppointmentsInSameDate = await appointmentsController.findByDate(
      appointmentDate
    )

    if (findAppointmentsInSameDate) {
      throw Error('This appointment already booked')
    }

    const appointment = appointmentsController.create({
      provider_id,
      date: appointmentDate
    })

    await appointmentsController.save(appointment)

    return appointment
  }
}

export default CreateAppointmentService
