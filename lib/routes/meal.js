'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _express = require('express');

var _express2 = _interopRequireDefault(_express);

var _meals = require('../models/meals');

var _meals2 = _interopRequireDefault(_meals);

var _auth = require('../middleware/auth');

var _auth2 = _interopRequireDefault(_auth);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var router = _express2.default.Router();

var getMeal = function getMeal(req, res) {
    var id = req.params.id;

    return _meals2.default.findById(id, function (err, meal) {
        if (!meal) {
            return res.status(404).json({
                message: "Meal not found"
            });
        }
        if (err) {
            return res.status(500).json({
                message: "Error ocurred while retrieving meal "
            });
        }
        return meal;
    });
};

router.post('/:userid/meals', _auth2.default, function (req, res) {
    var userid = req.decoded.id;
    if (!req.body.name || !req.body.category || !req.body.amount) {
        return res.status(400).json({
            message: "Please provide all meal details"
        });
    } else {
        var time = new Date();
        var newMeal = {
            name: req.body.name,
            category: req.body.category,
            amount: req.body.amount,
            userid: userid,
            timeEaten: time
        };
        var meal = new _meals2.default(newMeal);
        meal.save(function (err) {
            if (err) {
                return res.status(500).json({
                    message: "Error adding meal"
                });
            } else {
                return res.status(201).json({
                    message: "Meal successfully added",
                    meal: meal
                });
            }
        });
    }
});

router.get('/:userid/meals', _auth2.default, function (req, res) {
    var query = {};
    _meals2.default.find(query, function (err, meals) {
        if (err) {
            return res.status(500).json({
                message: "Error fetching meals"
            });
        } else {
            return res.status(200).json(meals);
        }
    });
});

router.get('/:userid/meals/:id', _auth2.default, function (req, res) {
    return getMeal(req, res).then(function (meal) {
        return res.status(200).json(meal);
    });
});

router.put('/:userid/meals/:id', _auth2.default, function (req, res) {
    return getMeal(req, res).then(function (meal) {
        meal.name = req.body.name;
        meal.category = req.body.category;
        meal.amount = req.body.amount;

        meal.save(function (err) {
            if (err) {
                return res.status(500).json({
                    message: "Error Saving Details"
                });
            }
            return res.status(200).json({
                message: "Meal Updated",
                meal: meal
            });
        });
    });
});

router.delete('/:userid/meals/:id', _auth2.default, function (req, res) {
    return getMeal(req, res).then(function (meal) {
        meal.remove(function (err) {
            if (err) {
                return res.status(500).json({
                    message: "Error deleting meal"
                });
            }
            return res.status(200).json({
                message: "Meal Successfully deleted"
            });
        });
    });
});

exports.default = router;