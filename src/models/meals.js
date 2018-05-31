import mongoose, { Schema }  from 'mongoose';

const mealSchema = new mongoose.Schema({
    name : String,
    amount : String,
    category : String,
    timeEaten : Date,
    user : {
        type : Schema.Types.ObjectId,
        ref : 'User'
    }
})

const Meal = mongoose.model('Meal', mealSchema);

export default Meal;