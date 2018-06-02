import express from 'express';
import Meal from '../models/meals';
import auth from '../middleware/auth';

const router = express.Router();

const getMeal = (req, res) => { 
    const { id } = req.params;
    return Meal.findById(id, (err, meal) => {
        if(!meal){
            return res.status(404).json({
                message : "Meal not found"
            })
        }
        if(err){
            return res.status(500).json({
                message : "Error ocurred while retrieving meal "
            })
        }
        return meal
})
}

router.post('/:userid/meals', auth,(req, res) => {
    const userid = req.decoded.id
    if(!req.body.name || !req.body.category || !req.body.amount){
        return res.status(400).json({
            message : "Please provide all meal details"
        })
    } else {
        const time = new Date();
        const newMeal = {
            name : req.body.name,
            category : req.body.category,
            amount : req.body.amount,
            userid,
            timeEaten : time
        }
        const meal = new Meal(newMeal)
        meal.save( err => {
            if(err){
                return res.status(500).json({
                    message: "Error adding meal",
                })
            } else {
                return res.status(201).json({
                    message: "Meal successfully added",
                    meal
                })
            }
        })
    }
})

router.get('/:userid/meals', auth, (req, res) => {
    const query = {}
    Meal.find(query, (err, meals) => {
        if(err){
            return res.status(500).json({
                message : "Error fetching meals",
            })
        } else {
            return res.status(200).json(meals)
        }
    })
})

router.get('/:userid/meals/:id',auth, (req, res) => {
    return getMeal(req, res).then(meal =>{
        return res.status(200).json(meal)
    })
})

router.put('/:userid/meals/:id',auth, (req, res) => {
    return getMeal(req, res).then( meal => {
        meal.name = req.body.name;
        meal.category = req.body.category;
        meal.amount = req.body.amount;

        meal.save(err => {
            if (err){
                return res.status(500).json({
                    message : "Error Saving Details"
                })
            }
            return res.status(200).json({
                message: "Meal Updated",
                meal
            })
        })
    })
})

router.delete('/:userid/meals/:id', auth, (req, res) => {
    return getMeal(req, res).then( meal => {
        meal.remove(err =>{
            if(err){
                return res.status(500).json({
                    message : "Error deleting meal"
                })
            }
            return res.status(200).json({
                message : "Meal Successfully deleted"
            })
        })
    })
})

export default router;
