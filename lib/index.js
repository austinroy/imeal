'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _express = require('express');

var _express2 = _interopRequireDefault(_express);

var _mongoose = require('mongoose');

var _mongoose2 = _interopRequireDefault(_mongoose);

var _bodyParser = require('body-parser');

var _bodyParser2 = _interopRequireDefault(_bodyParser);

var _user = require('./routes/user');

var _user2 = _interopRequireDefault(_user);

var _meal = require('./routes/meal');

var _meal2 = _interopRequireDefault(_meal);

var _cors = require('cors');

var _cors2 = _interopRequireDefault(_cors);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

require('dotenv').config();

var app = (0, _express2.default)();

var PORT = process.env.PORT;

var databaseUrl = process.env.MONGODB_URI;

if (!PORT || !databaseUrl) {
    console.log("Check env variables");
} else {
    console.log('PORT is ' + PORT + ' and db is ' + databaseUrl);
}

app.use(_bodyParser2.default.json());
app.use(_bodyParser2.default.urlencoded({ extended: 'true' }));
app.use((0, _cors2.default)({
    origin: ["http://localhost:3000", "https://imeal-client.herokuapp.com/"],
    optionsSuccessStatus: 200
}));

app.use(function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});

_mongoose2.default.connect(databaseUrl, function () {
    console.log("Connected to DB");
});
app.get('/', function (req, res) {
    return res.send({ welcome: 'This is iMeal' });
});
app.use('/', _user2.default);
app.use('/', _meal2.default);

app.listen(PORT, function () {
    console.log('App running on port: ' + PORT);
});

exports.default = app;