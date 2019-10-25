import User from '../models/User'

class UserController {
    async index(req, res) {
        const user = await User.findAll()

        return res.json(user)
    }

    async store(req, res) {
        const userExist = await User.findOne({ where: { email: req.body.email }})

        if(userExist) {
            return res.status(400).json({ Error: 'Email already exits !' })
        }

        const { id, name, email } = await User.create(req.body)

        return res.json({
            id,
            name,
            email
        })
    }

    async update(req, res) {
        const { email, oldPassword } = req.body
        const user = await User.findByPk(req.userId)

        if(email !== user.email) {
            const userExist = await User.findOne({ where: { email }})

            if(userExist) {
                return res.status(400).json({ Error: 'User already exits !' })
            }
        }

        if(oldPassword && !(await user.checkPassword(oldPassword))) {
            return res.status(401).json({ error: 'Password does not match' })
        }

        const { id, name, provider } = await user.update(req.body)

        return res.json({
            id,
            name,
            provider
        })
    }

}

export default new UserController()