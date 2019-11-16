import JWT from 'jsonwebtoken'
import bcrypt from 'bcryptjs'

import authConfig from '../../config/auth'
import User from '../models/User'

class Login {
    static async store(req, res) {
        const { email, password } = req.body
        const user = await User.findOne({ where: { email } })

        if(!user) {
            return res.status(401).json({ error: 'Email or password is invalid !'})
        }
        
        if(password && !(await user.checkPassword(password))) {
            return res.status(401).json({ error: 'Email or password is invalid !'})
        }
        
        const { id, name } = user
        
        return res.json({
            name,
            email,
            token: JWT.sign({ id }, authConfig.secret, {
                expiresIn: authConfig.expiresIn
            })
        })
    }
}

export default Login