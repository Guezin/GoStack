module.exports = {
    dialect: 'postgres',
    host: 'host.docker.internal',
    username: 'postgres',
    password: 'teste',
    database: 'gobarber',
    define: {
        timestamps: true,
        underscored: true,
        underscoredAll: true
    }
}