import express from 'express';
import mongoose from 'mongoose';
import bodyParser from 'body-parser';
import userRoutes from './src/routes/user';
import mealRoutes from './src/routes/meal';
import cors from 'cors';

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: 'true'}));
app.use(cors());

app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
  });

mongoose.connect('mongodb://localhost/imeal', () => {
    console.log("Connected to DB");
});

app.use('/', userRoutes );
app.use('/', mealRoutes);

app.listen(8080, () => {
    console.log("App running on port 8080")
})

export default app;
