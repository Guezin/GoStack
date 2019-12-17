import Sequelize, { Model } from 'sequelize'

class File extends Model {
    static init(connectionDB) {
        super.init({
            name: Sequelize.STRING,
            filename: Sequelize.STRING,
            url: {
                type: Sequelize.VIRTUAL,
                get() {
                    return `${process.env.APP_URL}/files/${this.filename}`
                }
            }

        },
        {
            sequelize: connectionDB
        }
        )

        return this

    }
}

export default File