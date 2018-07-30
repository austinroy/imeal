import express from 'express';
import mongoose from 'mongoose';
import bodyParser from 'body-parser';
import userRoutes from './src/routes/user';
import mealRoutes from './src/routes/meal';
import cors from 'cors';
require('dotenv').config();

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: 'true'}));
app.use(cors({
    origin :  ["http://localhost:3000", "https://imeal-client.herokuapp.com/"],
    optionsSuccessStatus: 200 
}
));

app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
  });

const databaseUrl = process.env.DB_URI;

mongoose.connect(databaseUrl, () => {
    console.log("Connected to DB");
});
app.get('/', (req, res) => res.send({ welcome: 'This is iMeal' }))
app.use('/', userRoutes );
app.use('/', mealRoutes);

const PORT = process.env.PORT || 8080;

app.listen(PORT, () => {
    console.log(`App running on port: ${PORT}`)
})

export default app;
