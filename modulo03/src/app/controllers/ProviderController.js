import User from '../models/User'
import File from '../models/File'


class ProviderController {
    static async index(req, res) {
        const providers = await User.findAll({
            where: { provide: true },
            attributes: ['id', 'name', 'email', 'avatar_id'],
            include: [{
                model: File,
                as: 'avatar',
                attributes: ['name', 'filename', 'url']
            }]
        })

        return res.json(providers)
    }
}

export default ProviderController