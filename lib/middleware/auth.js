'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _jsonwebtoken = require('jsonwebtoken');

var _jsonwebtoken2 = _interopRequireDefault(_jsonwebtoken);

var _config = require('../config');

var _config2 = _interopRequireDefault(_config);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var secretKey = _config2.default.SECRET_KEY;

var auth = function auth(req, res, next) {
    var token = req.headers['x-access-token'] || req.body.token;
    if (token) {
        _jsonwebtoken2.default.verify(token, secretKey, function (err, decoded) {
            if (err) {
                return res.status(500).json({
                    message: "Invalid token"
                });
            } else {
                req.decoded = decoded;
                next();
            }
        });
    } else {
        return res.status(401).json({
            message: "No token"
        });
    }
};

exports.default = auth;