/**
 * 1 - Recebimento das informaçoes
 * 2 - Tratativa de erros/ excessões
 * 3 - Acesso ao Controller
 */

import { startOfHour } from 'date-fns'

import Appointment from '../models/Appointment'
import AppointmentsController from '../controllers/AppointmentsController'

interface RequestDTO {
  provider: string
  date: Date
}

class CreateAppointmentService {
  private appointmentsController: AppointmentsController

  constructor(appointmentsController: AppointmentsController) {
    this.appointmentsController = appointmentsController
  }

  public execute({ provider, date }: RequestDTO): Appointment {
    const appointmentDate = startOfHour(date)

    const findAppointmentsInSameDate = this.appointmentsController.findByDate(
      appointmentDate
    )

    if (findAppointmentsInSameDate) {
      throw Error('This appointment already booked')
    }

    const appointment = this.appointmentsController.create({
      provider,
      date: appointmentDate
    })

    return appointment
  }
}

export default CreateAppointmentService
