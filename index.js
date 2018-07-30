import express from 'express';
import mongoose from 'mongoose';
import bodyParser from 'body-parser';
import userRoutes from './src/routes/user';
import mealRoutes from './src/routes/meal';
import cors from 'cors';

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: 'true'}));
app.use(cors({
    origin :  "http://localhost:3000",
    optionsSuccessStatus: 200 
}
));

app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
  });

mongoose.connect('mongodb://localhost/imeal', () => {
    console.log("Connected to DB");
});
app.get('/', (req, res) => res.send({ welcome: 'This is iMeal' }))
app.use('/', userRoutes );
app.use('/', mealRoutes);

const PORT = process.env.PORT || 8080;

app.listen(PORT, () => {
    console.log("App running on port ", PORT)
})

export default app;
