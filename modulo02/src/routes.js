import { Router } from 'express'
import User from './app/models/User'

class Routes {
    constructor() {
        this.routes = Router()

        this.getUsers()
    }

    getUsers() {
        this.routes.get('/users', async (req, res) => {
            const user = await User.create({
                name: 'leandro',
                email: 'leandro@gmail.com',
                password_hash: '1234567'
            })

            return res.json(user)
        })
    }
}

export default new Routes().routes