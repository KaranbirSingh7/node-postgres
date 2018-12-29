const Sequelize = require('sequelize');

const dbUser = process.env.POSTGRES_USER
const dbPasswd = process.env.POSTGRES_PASSWORD
const dbHost = process.env.POSTGRES_HOST || 'localhost'
const dbName = 'codegig'

const db = new Sequelize(dbName, dbUser, dbPasswd, {
    host: dbHost,
    dialect: 'postgres',
    pool: {
        max: 5,
        min: 0,
        acquire: 30000,
        idle: 10000
    },
    operatorsAliases: false
});

module.exports=db;