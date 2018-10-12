import mongoose, { Schema } from 'mongoose';

const mealSchema = new mongoose.Schema({
  name: String,
  amount: String,
  category: String,
  timeEaten: Date,
  userId: {
    type: Schema.Types.ObjectId,
    ref: 'User',
  },
  visible: { type: Boolean, default: false },
  ratings: [{ type: Schema.Types.ObjectId, ref: 'Rating' }],
});

const Meal = mongoose.model('Meal', mealSchema);

export default Meal;
