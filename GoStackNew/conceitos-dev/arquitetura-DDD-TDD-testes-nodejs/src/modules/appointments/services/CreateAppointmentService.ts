/**
 * 1 - Recebimento das informaçoes
 * 2 - Tratativa de erros/ excessões
 * 3 - Acesso ao Repositório
 */

import { startOfHour, isBefore, getHours, format } from 'date-fns';
import { injectable, inject } from 'tsyringe';

import AppError from '@shared/errors/AppError';

import Appointment from '../infra/typeorm/entities/Appointment';
import IAppointmentsRepository from '@modules/appointments/repositories/IAppointmentsRepository';

import INotificationRepository from '@modules/notifications/repositories/INotificationRepository';

interface IRequestDTO {
  provider_id: string;
  user_id: string;
  date: Date;
}

@injectable()
class CreateAppointmentService {
  private appointmentsRepository: IAppointmentsRepository;
  private notificationsRepository: INotificationRepository;

  constructor(
    @inject('AppointmentsRepository')
    appointmentsRepository: IAppointmentsRepository,

    @inject('NotificationRepository')
    notificationsRepository: INotificationRepository,
  ) {
    this.appointmentsRepository = appointmentsRepository;
    this.notificationsRepository = notificationsRepository;
  }

  public async execute({
    provider_id,
    user_id,
    date,
  }: IRequestDTO): Promise<Appointment> {
    const appointmentDate = startOfHour(date);

    const findAppointmentsInSameDate = await this.appointmentsRepository.findByDate(
      appointmentDate,
    );

    if (user_id === provider_id) {
      throw new AppError("You can't create an appointment with yourself.");
    }

    if (getHours(appointmentDate) < 8 || getHours(appointmentDate) > 17) {
      throw new AppError(
        'You can only create appointments between 8am and 5pm.',
      );
    }

    if (isBefore(appointmentDate, Date.now())) {
      throw new AppError("You can't create an appointment on a past date.");
    }

    if (findAppointmentsInSameDate) {
      throw new AppError('This appointment already booked');
    }

    const appointment = await this.appointmentsRepository.create({
      provider_id,
      user_id,
      date: appointmentDate,
    });

    const dateFormatted = format(appointmentDate, "dd/MM/yyyy 'às' HH:mm");

    await this.notificationsRepository.create({
      recipient_id: provider_id,
      content: `Novo agendamento para ${dateFormatted}.`,
    });

    return appointment;
  }
}

export default CreateAppointmentService;
