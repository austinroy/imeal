import mongoose from 'mongoose';

const mealSchema = new mongoose.Schema({
    name : String,
    amount : String,
    category : String,
    timeEaten : Date
})

const Meal = mongoose.model('Meal', mealSchema);

export default Meal;