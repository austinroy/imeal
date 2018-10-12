import mongoose, { Schema } from 'mongoose';

const ratingSchema = new mongoose.Schema({
  rating: Number,
  user: { type: Schema.Types.ObjectId, ref: 'User' },
  meal: { type: Schema.Types.ObjectId, ref: 'Meal' },
});

const Rating = mongoose.model('Rating', ratingSchema);

export default Rating;
