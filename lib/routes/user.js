'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _express = require('express');

var _express2 = _interopRequireDefault(_express);

var _users = require('../models/users');

var _users2 = _interopRequireDefault(_users);

var _jsonwebtoken = require('jsonwebtoken');

var _jsonwebtoken2 = _interopRequireDefault(_jsonwebtoken);

var _config = require('../config');

var _config2 = _interopRequireDefault(_config);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var secretKey = _config2.default.SECRET_KEY;

var router = _express2.default.Router();

var getUser = function getUser(req, res) {
    var credentials = {
        username: req.body.username
    };
    return _users2.default.findOne(credentials, function (err, user) {
        if (err) {
            return res.status(500).json({
                message: "Error finding user",
                err: err
            });
        } else {
            if (!user) {
                return res.status(404).json({
                    message: "User not found"
                });
            } else {
                return user;
            }
        }
    });
};

router.post('/signup', function (req, res) {
    if (!req.body.username || !req.body.password) {
        return res.status(400).json({
            message: "Please provide all the details"
        });
    } else {
        var newUser = new _users2.default(req.body);
        newUser.save(function (err) {
            if (err) {
                return res.status(500).json({
                    message: "Error Adding New User",
                    err: err
                });
            } else {
                return res.status(201).json({
                    message: "New User Added",
                    newUser: newUser
                });
            }
        });
    }
});

router.post('/login', function (req, res) {
    return getUser(req, res).then(function (user) {

        var validCredentials = user.comparePassword(req.body.password);

        if (!validCredentials) {
            return res.status(403).json({
                message: "Invalid credentials"
            });
        } else {
            var username = user.username,
                id = user.id;

            var userInfo = { username: username, id: id };
            var token = _jsonwebtoken2.default.sign(userInfo, secretKey, { expiresIn: 3600 });
            return res.json({
                message: "Logged in successfully",
                user: userInfo,
                token: token
            });
        }
    }).catch(function (err) {
        return console.log(err);
    });
});

exports.default = router;