import mongoose from 'mongoose';
import { Sequelize } from 'sequelize'
import dotenv from 'dotenv';
dotenv.config();

const URI = process.env.MONGODB_URL
const connectMongoDB = async () => {
    try {
        await mongoose.connect(`${URI}`);
        console.log('MongoDB Connected');
    } catch (error) {
      console.error('Error connecting to MongoDB', error);
    }
};

const dbName = process.env.DB_NAME as string
const dbUser = process.env.DB_USER as string
const dbHost = process.env.DB_HOST
const dbPassword = process.env.DB_PASSWORD

const sequelizeConnection = new Sequelize(dbName, dbUser, dbPassword, {
  host: dbHost,
  dialect: 'postgres'
});

const connectPostgres = async () => {
  try {
    await sequelizeConnection.authenticate();
    console.log('PostgreSQL Connected');
  } catch (error) {
    console.error('Error connecting to Postgres', error);
  }
};

export { connectMongoDB, connectPostgres, sequelizeConnection };