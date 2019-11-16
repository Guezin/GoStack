import Sequelize from 'sequelize'

import User from '../app/models/User'
import configDatabase from '../config/database'

class ConnectionDB {
    constructor() {
        this.model = [User]

        this.init()
    }

    init() {
        const connection = new Sequelize(configDatabase)

        this.model.map(user => user.init(connection))
    }
}

export default new ConnectionDB()