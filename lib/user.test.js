'use strict';

var chai = require('chai');
var chaiHttp = require('chai-http');
var app = require('../index.js');
var mongoose = require('mongoose');

var should = chai.should();

describe('User Tests', function () {
    chai.use(chaiHttp);
    before(function () {
        mongoose.connect('mongodb://localhost/imeal', function () {});

        var db = mongoose.connection;

        db.collection('meals').drop(function () {
            console.log("Dropping Meals");
        });
        db.collection('users').drop(function () {
            console.log("Dropping Meals");
        });
    });

    it('Should create a new user', function (done) {
        var userData = {
            username: "Test",
            password: "testpass"
        };
        chai.request('http://localhost:8080').post('/signup').send(userData).end(function (err, res) {
            res.should.have.status(201);
            res.body.should.be.a('object');
            res.body.should.have.property('message');
            res.body.should.have.property('newUser');
            done();
        });
    });

    it('Should login a user', function (done) {
        var userData = {
            username: "Test",
            password: "testpass"
        };
        chai.request('http://localhost:8080').post('/login').send(userData).end(function (err, res) {
            res.should.have.status(200);
            res.body.should.be.a('object');
            res.body.should.have.property('message');
            res.body.should.have.property('token');
            done();
        });
    });
});