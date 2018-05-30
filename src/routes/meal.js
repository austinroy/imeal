import express from 'express';
import Meal from '../models/meals';

const router = express.Router()

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

router.post('/', (req, res) => {
    if(!req.body.name || !req.body.category || !req.body.amount){
        return res.status(400).json({
            message : "Please provide all meal details"
        })
    } else {
        const time = new Date();
        const meal = new Meal(req.body, time)
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

router.get('/', (req, res) => {
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

router.get('/:id', (req, res) => {
    return getMeal(req, res).then(meal =>{
        return res.status(200).json(meal)
    })
})

router.put('/:id', (req, res) => {
    return getMeal(req, res).then( meal => {
        meal.name = req.body.name;
        meal.category = req.body.name;
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

router.delete('/:id', (req, res) => {
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
