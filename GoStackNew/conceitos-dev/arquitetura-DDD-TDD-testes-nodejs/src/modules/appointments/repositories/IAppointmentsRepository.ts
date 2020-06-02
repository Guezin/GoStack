import Appointment from '../infra/typeorm/entities/Appointment';

import IFindAllMonthFromProviderDTO from '@modules/appointments/infra/dtos/IFindAllMonthFromProviderDTO';
import ICreateAppointmentDTO from '@modules/appointments/infra/dtos/ICreateAppointmentDTO';

export default interface IAppointmentsRepository {
  create(data: ICreateAppointmentDTO): Promise<Appointment>;
  findAll(): Promise<Appointment[]>;
  findByDate(date: Date): Promise<Appointment | undefined>;
  findAllInMonthFromProvider(
    data: IFindAllMonthFromProviderDTO,
  ): Promise<Appointment[]>;
}
