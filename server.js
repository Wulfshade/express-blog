const { Sequelize } = require('sequelize');
const dotenv = require('dotenv');

process.on('uncaughtException', err => {
  console.log('UNHANDLED EXEPTION! Shutting down...');
  console.log(`${err.name}:`, err.message);
  process.exit(1);
});

dotenv.config({ path: './config.env' });
const app = require('./app');

// Initialize the database connection
const dbHost = process.env.DATABASE_HOST;
const dbPort = process.env.DATABASE_PORT;
const dbName = process.env.DATABASE;
const dbUser = process.env.DATABASE_USERNAME;
const dbPass = process.env.DATABASE_PASSWORD;

const sequelize = new Sequelize(dbName, dbUser, dbPass, {
  dialect: 'mariadb',
  host: dbHost,
  port: dbPort,
});

sequelize
  .authenticate()
  .then(() => console.log('Connection has been established successfully.'));

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
