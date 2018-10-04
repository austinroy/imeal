'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _mongoose = require('mongoose');

var _mongoose2 = _interopRequireDefault(_mongoose);

var _bcrypt = require('bcrypt');

var _bcrypt2 = _interopRequireDefault(_bcrypt);

var _mongooseUniqueValidator = require('mongoose-unique-validator');

var _mongooseUniqueValidator2 = _interopRequireDefault(_mongooseUniqueValidator);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var userSchema = (0, _mongoose.Schema)({
    username: {
        type: String,
        unique: true,
        required: true
    },
    password: String
});

userSchema.pre('save', function (next) {
    var user = this;

    if (!user.isModified('password')) {
        next();
    }
    // Hash password
    _bcrypt2.default.hash(user.password, 256).then(function (hash, err) {
        if (err) {
            return next(err);
        } else {
            user.password = hash;
            next();
        }
    });
});

userSchema.methods.comparePassword = function (password) {
    var user = this;
    return _bcrypt2.default.compareSync(password, user.password);
};

userSchema.plugin(_mongooseUniqueValidator2.default);

var User = _mongoose2.default.model('User', userSchema);

exports.default = User;