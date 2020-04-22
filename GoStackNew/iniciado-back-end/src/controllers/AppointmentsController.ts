import { isEqual } from 'date-fns'

import Appointment from '../models/Appointment'

interface AppointmentControllerDTO {
  provider: string
  date: Date
}

class AppointmentsController {
  private appointments: Appointment[]

  constructor() {
    this.appointments = []
  }

  public all(): Appointment[] {
    return this.appointments
  }

  public findByDate(date: Date): Appointment | null {
    const findAppointmentsInSameDate = this.appointments.find(appointment =>
      isEqual(date, appointment.date)
    )

    return findAppointmentsInSameDate || null
  }

  public create({ provider, date }: AppointmentControllerDTO): Appointment {
    const appointment = new Appointment({
      provider,
      date
    })

    this.appointments.push(appointment)

    return appointment
  }
}

export default AppointmentsController
