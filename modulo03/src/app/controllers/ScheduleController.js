import { Op as Operator } from 'sequelize'
import { startOfDay, endOfDay, parseISO } from 'date-fns'

import User from '../models/User'
import Appointments from '../models/Appointment'

class ScheduleController {
	static async index(req, res) {
		const checkUserProvider = await User.findOne({
			where: {
				id: req.userId,
				provider: true
			}
		})

		if (!checkUserProvider) {
			return res.status(401).json({ error: 'User is not a provider !' })
		}
		const { date } = req.query
		const parseDate = parseISO(date)

		const appointments = await Appointments.findAll({
			where: {
				provider_id: req.userId,
				canceled_at: null,
				date: {
					[Operator.between]: [
						startOfDay(parseDate),
						endOfDay(parseDate)
					]
				},
				include: [
					{
						model: User,
						as: 'user',
						attributes: ['name']
					}
				]
			},
			order: ['date']
		})

		return res.json(appointments)
	}
}

export default ScheduleController