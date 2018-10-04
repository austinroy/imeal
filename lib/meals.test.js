'use strict';

var chai = require('chai');
var chaiHttp = require('chai-http');
var app = require('../index.js');

var should = chai.should();
console.log();

describe('Meal Tests', function () {
    chai.use(chaiHttp);

    it('Add a meal', function (done) {
        var userData = {
            username: "Test",
            password: "testpass"
        };
        chai.request('http://localhost:8080').post('/login').send(userData).end(function (err, res) {
            var userId = res.body.user.id;
            var token = res.body.token;
            var mealData = {
                name: "Steak",
                category: "Protein",
                amount: '2 Kg'
            };
            chai.request('http://localhost:8080/' + userId + '/meals').post('').set('x-access-token', token).send(mealData).end(function (err, res) {
                res.should.have.status(201);
                res.body.should.be.a('object');
                res.body.should.have.property('message');
                res.body.should.have.property('meal');
                done();
            });
        });
    });

    it('Get User Meals', function (done) {
        var userData = {
            username: "Test",
            password: "testpass"
        };
        chai.request('http://localhost:8080').post('/login').send(userData).end(function (err, res) {
            var userId = res.body.user.id;
            var token = res.body.token;
            var mealData = {
                name: "Steak",
                category: "Protein",
                amount: '2 Kg'
            };
            chai.request('http://localhost:8080/' + userId + '/meals').get('').set('x-access-token', token).send(mealData).end(function (err, res) {
                res.should.have.status(200);
                res.body.should.be.a('array');
                done();
            });
        });
    });

    it('Update Meal', function (done) {
        var userData = {
            username: "Test",
            password: "testpass"
        };
        chai.request('http://localhost:8080').post('/login').send(userData).end(function (err, res) {
            var userId = res.body.user.id;
            var token = res.body.token;
            var mealData = {
                name: "Steak",
                category: "Protein",
                amount: '2 Kg'
            };
            chai.request('http://localhost:8080/' + userId + '/meals').get('').set('x-access-token', token).send(mealData).end(function (err, res) {
                var meal_id = res.body[0]._id;
                var mealDataUpdate = {
                    name: "Steak",
                    category: "Protein",
                    amount: '5 Kg'
                };
                chai.request('http://localhost:8080/' + userId + '/meals/' + meal_id).put('').set('x-access-token', token).send(mealDataUpdate).end(function (err, res) {
                    res.should.have.status(200);
                    res.body.should.be.a('object');
                    res.body.should.have.property('message');
                    res.body.should.have.property('meal');
                    done();
                });
            });
        });
    });

    it('Update Meal', function (done) {
        var userData = {
            username: "Test",
            password: "testpass"
        };
        chai.request('http://localhost:8080').post('/login').send(userData).end(function (err, res) {
            var userId = res.body.user.id;
            var token = res.body.token;
            var mealData = {
                name: "Steak",
                category: "Protein",
                amount: '2 Kg'
            };
            chai.request('http://localhost:8080/' + userId + '/meals').get('').set('x-access-token', token).send(mealData).end(function (err, res) {
                var meal_id = res.body[0]._id;
                var mealDataUpdate = {
                    name: "Steak",
                    category: "Protein",
                    amount: '5 Kg'
                };
                chai.request('http://localhost:8080/' + userId + '/meals/' + meal_id).delete('').set('x-access-token', token).send(mealDataUpdate).end(function (err, res) {
                    res.should.have.status(200);
                    res.body.should.be.a('object');
                    res.body.should.have.property('message');
                    done();
                });
            });
        });
    });
});