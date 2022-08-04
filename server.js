const { Sequelize } = require('sequelize');
const dotenv = require('dotenv');

dotenv.config({ path: './config/config.env' });

const env = process.env.NODE_ENV || 'development';
const dbConfig = require(__dirname + '/config/config.json')[env];

process.on('uncaughtException', err => {
  console.log('UNHANDLED EXEPTION! Shutting down...');
  console.log(`${err.name}:`, err.message);
  process.exit(1);
});

const app = require('./app');

const sequelize = new Sequelize(
  dbConfig.database,
  dbConfig.username,
  dbConfig.password,
  dbConfig
);

sequelize
  .authenticate()
  .then(() => {
    console.log('Connection has been established successfully.');
  })
  .catch(err => {
    console.log('Unable to connect ot the database:', err);
  });

const port = process.env.PORT || 3000;
const server = app.listen(port, () => {
  console.log(`App listenning on port ${port}...`);
});

process.on('unhandledRejection', err => {
  console.log('UNHANDLED REJECTION! Shutting down...');
  console.log(`${err.name}:`, err.message);
  server.close(() => {
    process.exit(1);
  });
});
