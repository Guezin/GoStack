import JWT from 'jsonwebtoken'

import authConfig from '../../config/auth'

export default async (req, res, next) => {
    const authToken = req.headers.authorization

    if(!authToken) {
        return res.status(401).json({ error: 'Token does not provided !' })
    }

    const [, token] = authToken.split(' ')

    const decoded = JWT.verify(token, authConfig.secret, (err, result) => {
        if(err) return res.json({ error: 'Token invalid !' })
        
        return result

    })
    
    req.userId = decoded.id

    return next()

}