import * as Yup from 'yup'
import { startOfHour, parseISO, isBefore, format, subHours } from 'date-fns'
import pt from 'date-fns/locale/pt'

import User from '../models/User'
import File from '../models/File'
import Appointment from '../models/Appointment'
import Notification from '../schemas/Notification'
import Mail from '../../lib/Mail'

class AppointmentController {
    static async index(req, res) {
        const { page = 1 } = req.query
        const appointments = await Appointment.findAll({
            where: {
                user_id: req.userId,
                canceled_at: null,
            },
            order: ['date'],
            attributes: ['id', 'date'],
            limmit: 20,
            offset: (page - 1) * 20,
            include: [
                {
                    model: User,
                    as: 'provider',
                    attributes: ['id', 'name', 'email'],
                    include: [
                        {
                            model: File,
                            as: 'avatar',
                            attributes: ['id', 'filename','url']
                        }
                    ]
                },
            ]
        })

        return res.json(appointments)
    }

    static async store(req, res) {
        const schema = Yup.object().shape({
            provider_id: Yup.number().required(),
            date: Yup.date().required()
        })

        if(!(await schema.isValid(req.body))) {
            return res.status(401).json({ error: 'Validation fails !' })
        }

        const { provider_id, date } = req.body

        const checkIsProvider = await User.findOne({ 
            where: { id: provider_id, provider: true }
        })

        if(!checkIsProvider) {
            return res
                .status(401)
                .json({ error: 'You can only create appointments with providers !' })
        }

        const hourStart = startOfHour(parseISO(date))

        if(isBefore(hourStart, new Date())) {
            return res.status(401).json({ error: 'Past date are not permitted !' })
        }

        const checkAvailability = await Appointment.findOne({
            where: {
                provider_id,
                canceled_at: null,
                date: hourStart
            }
        })

        if(checkAvailability) {
            return res.status(401).json({ error: 'Appointment date is not available' })
        }

        if(req.userId === provider_id) {
            return res
                .status(401)
                .json({ 
                    error: "Sorry, it's not possible to create a schedule for yourself"
                })
        }
        const appointment = await Appointment.create({
            user_id: req.userId,
            provider_id,
            date: hourStart
        })

        const user = await User.findByPk(req.userId)
        const formattedDate = format(
            hourStart, 
            "'dia' dd 'de' MMMM', às' H:mm'h.'",
            { locale: pt }   
        )

        await Notification.create({
            content: `Novo agendamento de ${user.name} para ${formattedDate}`,
            user: provider_id
        })

        return res.json(appointment)
    }

    static async delete(req, res) {
        const appointment = await Appointment.findByPk(req.params.id, {
            include: [
                {
                    model: User,
                    as: 'provider',
                    attributes: ['name', 'email']
                }
            ]
        })

        if(appointment.user_id !== req.userId) {
            return res.status(401).json({ error: "You don't have permission to cancel this appointment !" })
        }

        const dateWithSub = subHours(appointment.date, 2)
        
        if(isBefore(dateWithSub, new Date())) {
            return res.status(401).json({ error: 'You can only cancel appointment 2 hours advence.' })
        }
        
        appointment.canceled_at = new Date()
        
        await appointment.save()

        await Mail.sendMail({
            to: `${appointment.provider.name} <${appointment.provider.email}>`,
            subject: 'Agendamento cancelado',
            text: 'Você tem um novo cancelamento !'
        })

        return res.json(appointment)
    }

}

export default AppointmentController