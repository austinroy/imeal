'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _mongoose = require('mongoose');

var _mongoose2 = _interopRequireDefault(_mongoose);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var mealSchema = new _mongoose2.default.Schema({
    name: String,
    amount: String,
    category: String,
    timeEaten: Date,
    userid: {
        type: _mongoose.Schema.Types.ObjectId,
        ref: 'User'
    }
});

var Meal = _mongoose2.default.model('Meal', mealSchema);

exports.default = Meal;