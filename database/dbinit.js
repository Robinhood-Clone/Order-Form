const Sequelize = require('sequelize');

const sequelize = new Sequelize('', 'root', 'young', {
  host: 'localhost',
  dialect: 'mysql'
})

sequelize.query("CREATE DATABASE IF NOT EXISTS robinhoodclone;")
.then(() => console.log('created database'))
.catch(() => console.log('error creating database'))