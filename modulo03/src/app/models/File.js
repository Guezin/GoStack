import Sequelize, { Model } from 'sequelize'

class File extends Model {
    static init(connectionDB) {
        super.init({
            name: Sequelize.STRING,
            path: Sequelize.STRING,

        },
        {
            sequelize: connectionDB
        }
        )

        return this

    }
}

export default File