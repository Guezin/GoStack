import { uuid } from 'uuidv4';
import { isEqual, getMonth, getYear, getDate } from 'date-fns';

import Appointment from '../../infra/typeorm/entities/Appointment';

import IAppointmentsRepository from '@modules/appointments/repositories/IAppointmentsRepository';
import ICreateAppointmentDTO from '@modules/appointments/infra/dtos/ICreateAppointmentDTO';
import IFindAllMonthFromProviderDTO from '@modules/appointments/infra/dtos/IFindAllMonthFromProviderDTO';
import IFindAllInDayFromProviderDTO from '@modules/appointments/infra/dtos/IFindAllInDayFromProviderDTO';

class FakeAppointmentsRepository implements IAppointmentsRepository {
  private appoitments: Appointment[] = [];

  public async findAll(): Promise<Appointment[]> {
    return this.appoitments;
  }

  public async findAllInMonthFromProvider({
    provider_id,
    month,
    year,
  }: IFindAllMonthFromProviderDTO): Promise<Appointment[]> {
    const findAppointment = this.appoitments.filter(
      appoitment =>
        appoitment.provider_id === provider_id &&
        getMonth(appoitment.date) + 1 === month &&
        getYear(appoitment.date) === year,
    );

    return findAppointment;
  }

  public async findAllInDayFromProvider({
    provider_id,
    day,
    month,
    year,
  }: IFindAllInDayFromProviderDTO): Promise<Appointment[]> {
    const findAppointment = this.appoitments.filter(
      appoitment =>
        appoitment.provider_id === provider_id &&
        getDate(appoitment.date) === day &&
        getMonth(appoitment.date) + 1 === month &&
        getYear(appoitment.date) === year,
    );

    return findAppointment;
  }

  public async findByDate(
    date: Date,
    provider_id: string,
  ): Promise<Appointment | undefined> {
    const findAppointment = this.appoitments.find(
      appointment =>
        isEqual(appointment.date, date) &&
        appointment.provider_id === provider_id,
    );

    return findAppointment;
  }

  public async create({
    provider_id,
    user_id,
    date,
  }: ICreateAppointmentDTO): Promise<Appointment> {
    const appoitment = new Appointment();
    Object.assign(appoitment, { id: uuid(), provider_id, date, user_id });

    this.appoitments.push(appoitment);

    return appoitment;
  }
}

export default FakeAppointmentsRepository;
