import * as Yup from 'yup'

import User from '../models/User'
import File from '../models/File'

class UserController {
	static async index(req, res) {
		const users = await User.findAll()

		return res.json(users)
	}

	static async store(req, res) {
		const { email } = req.body
		const userExists = await User.findOne({ where: { email } })
		const schema = Yup.object().shape({
			name: Yup
				.string()
				.required(),
			email: Yup
				.string()
				.email()
				.required(),
			password: Yup
				.string()
				.required()
				.min(6)
		})

		if (!(await schema.isValid(req.body))) {
			return res.status(401).json({ error: "Validation failed !" })
		}

		if (userExists) {
			return res.status(401).json({ error: "User already exists !" })
		}

		const { name } = await User.create(req.body)

		return res.json({
			message: "User created successfully",
			name,
			email
		})
	}

	static async update(req, res) {
		const { email, oldPassword } = req.body
		const user = await User.findByPk(req.userId)
		const schema = Yup.object().shape({
			name: Yup.string(),
			email: Yup
				.string()
				.email(),
			oldPassword: Yup
				.string()
				.min(6),
			password: Yup
				.string()
				.min(6)
				.when('oldPassword', (oldPassword, password) =>
					oldPassword ? password.required() : oldPassword
				),
			confirmPassword: Yup
				.string()
				.when('password', (password, confirmPassword) =>
					password ? confirmPassword.required().oneOf([Yup.ref('password'), null]) : password
				)
		})

		if (!(await schema.isValid(req.body))) {
			return res.status(401).json({ error: "Validation failed !" })
		}

		if (email !== user.email) {
			const userExists = await User.findOne({ where: { email } })

			if (userExists) {
				return res.status(401).json({ error: "Email already exists !" })
			}
		}

		if (oldPassword && !(await user.checkPassword(oldPassword))) {
			return res.status(401).json({ error: "Password is invalid !" })
		}

		await user.update(req.body)

		const { id, name, avatar } = await User.findByPk(req.userId, {
			include: [
				{
					model: File,
					as: 'avatar',
					attributes: ['id', 'filaname', 'url']
				}
			]
		})

		return res.json({
			message: 'User successfully changed ! ',
			id,
			name,
			email,
			avatar
		})
	}
}

export default UserController