import AppError from '@shared/errors/AppError';

import FakeAppointmentRepository from '../repositories/fakes/FakeAppointmentRepository';

import CreateAppointmentService from './CreateAppointmentService';

let fakeAppointmentRepository: FakeAppointmentRepository;
let createAppointment: CreateAppointmentService;

describe('CreateAppointment', () => {
  beforeEach(() => {
    fakeAppointmentRepository = new FakeAppointmentRepository();
    createAppointment = new CreateAppointmentService(fakeAppointmentRepository);
  });
  it('should be able to create a new appointment ', async () => {
    const appointment = await createAppointment.execute({
      date: new Date(),
      user_id: '12345',
      provider_id: '12345',
    });

    expect(appointment).toHaveProperty('id');
    expect(appointment.provider_id).toBe('12345');
  });

  it('should not be able to create two appointments on the same time', async () => {
    const appointmentDate = new Date(2020, 4, 21);

    await createAppointment.execute({
      date: appointmentDate,
      user_id: '12345',
      provider_id: '12345',
    });

    await expect(
      createAppointment.execute({
        date: appointmentDate,
        user_id: '12345',
        provider_id: '12345',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });
});
