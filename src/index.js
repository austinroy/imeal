import express from 'express';
import mongoose from 'mongoose';
import bodyParser from 'body-parser';
import cors from 'cors';
import log from 'why-is-node-running';
import userRoutes from './routes/user';
import mealRoutes from './routes/meal';

require('dotenv').config();

const app = express();

const { PORT } = process.env;

const databaseUrl = process.env.MONGODB_URI;

if (!PORT || !databaseUrl) {
  console.log('Check env variables');
} else {
  console.log(`PORT is ${PORT} and db is ${databaseUrl}`);
}

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: 'true' }));
app.use(cors({
  origin: ['http://localhost:3000', 'https://imeal-client.herokuapp.com/'],
  optionsSuccessStatus: 200,
}));

app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
  next();
});


mongoose.connect(databaseUrl, () => {
  console.log('Connected to DB');
});

app.get('/', (req, res) => res.send({ welcome: 'This is iMeal' }));
app.use('/', userRoutes);
app.use('/', mealRoutes);

setTimeout(function () {
  log() // logs out active handles that are keeping node running
}, 100);

module.exports = app;
