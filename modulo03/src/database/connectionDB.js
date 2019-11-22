import Sequelize from 'sequelize'

import User from '../app/models/User'
import File from '../app/models/File'
import Appointment from '../app/models/Appointment'
import configDatabase from '../config/database'

class ConnectionDB {
    constructor() {
        this.models = [User, File, Appointment]

        this.init()
    }

    init() {
        const connection = new Sequelize(configDatabase)
        
        this.models
            .map(model => model.init(connection))
            .map(model => model.associate && model.associate(connection.models))
    }
}

export default new ConnectionDB()