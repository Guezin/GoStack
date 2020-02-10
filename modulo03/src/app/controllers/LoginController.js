import JWT from 'jsonwebtoken'

import authConfig from '../../config/auth'
import User from '../models/User'
import File from '../models/File'

class Login {
	static async store(req, res) {
		const { email, password } = req.body
		const user = await User.findOne({
			where: { email },
			include: [
				{
					model: File,
					as: 'avatar',
					attributes: ['id', 'filename', 'url']
				}
			]
		})

		if (!user) {
			return res.status(401).json({ error: 'Email or password is invalid !' })
		}

		if (password && !(await user.checkPassword(password))) {
			return res.status(401).json({ error: 'Email or password is invalid !' })
		}

		const { id, name, avatar, provider } = user

		return res.json({
			user: {
				name,
				email,
				provider,
				avatar,
				token: JWT.sign({ id }, authConfig.secret, {
					expiresIn: authConfig.expiresIn
				})
			}
		})
	}
}

export default Login