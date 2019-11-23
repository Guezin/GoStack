import Sequelize from 'sequelize'
import mongoose from 'mongoose'

import User from '../app/models/User'
import File from '../app/models/File'
import Appointment from '../app/models/Appointment'
import configDatabase from '../config/database'

class ConnectionDB {
    constructor() {
        this.models = [User, File, Appointment]

        this.init()
        this.mongo()
    }

    init() {
        const connection = new Sequelize(configDatabase)
        
        return this.models
            .map(model => model.init(connection))
            .map(model => model.associate && model.associate(connection.models))
    }

    mongo() {
        const mongoConnection = mongoose.connect(
            'mongodb://localhost:27017/gobarber',
            { useNewUrlParser: true, useFindAndModify: true, useUnifiedTopology: true }
        )

        return mongoConnection
    }
}

export default new ConnectionDB()