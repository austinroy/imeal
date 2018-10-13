import express from 'express';
import Rating from '../models/ratings';
import auth from '../middleware/auth';
import Meal from '../models/meals';

const router = express.Router();

router.post('/rate/:mealid', auth, (req, res) => {
  const userid = req.decoded.id;
  const { mealid } = req.params;
  Rating.find({ user: userid, meal: mealid }, (err, ratings) => {
    if (err) {
      return res.status(500).json({
        message: 'Error making rating',
      });
    } if (ratings.length) {
      return res.status(400).json({
        message: 'Error: You can only rate a meal once',
      });
    }
    const { rating } = req.body;
    if (rating < 1 || rating > 5) {
      return res.status(400).json({
        message: 'All ratings should be between 1 and 5',
      });
    }
    const newRating = {
      rating,
      user: userid,
      meal: mealid,
    };

    const finalRating = Rating(newRating);
    return finalRating.save((error, savedRating) => {
      if (error) {
        return res.status(500).json({
          message: 'Error Saving Rating',
        });
      }
      console.log(savedRating);
      Meal.update({ _id: mealid }, { $push: { ratings: { $each: [savedRating] } } },
        savErr => console.log(savErr));
      return res.status(200).json({
        message: 'Rating Added',
      });
    });
  });
});

export default router;
