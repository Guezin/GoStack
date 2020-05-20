/**
 * 1 - Recebimento das informaçoes
 * 2 - Tratativa de erros/ excessões
 * 3 - Acesso ao Repositório
 */

import { startOfHour } from 'date-fns'
import { injectable, inject } from 'tsyringe'

import AppError from '@shared/errors/AppError'

import Appointment from '../infra/typeorm/entities/Appointment'
import IAppointmentsRepository from '@modules/appointments/repositories/IAppointmentsRepository'

interface IRequestDTO {
  provider_id: string
  date: Date
}

@injectable()
class CreateAppointmentService {
  private appointmentsRepository: IAppointmentsRepository

  constructor(
    @inject('AppointmentsRepository')
    appointmentsRepository: IAppointmentsRepository
  ) {
    this.appointmentsRepository = appointmentsRepository
  }

  public async execute({
    provider_id,
    date
  }: IRequestDTO): Promise<Appointment> {
    const appointmentDate = startOfHour(date)
    const findAppointmentsInSameDate = await this.appointmentsRepository.findByDate(
      appointmentDate
    )

    if (findAppointmentsInSameDate) {
      throw new AppError('This appointment already booked')
    }

    const appointment = this.appointmentsRepository.create({
      provider_id,
      date: appointmentDate
    })

    return appointment
  }
}

export default CreateAppointmentService
