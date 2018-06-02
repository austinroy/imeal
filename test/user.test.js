const chai = require('chai');
const chaiHttp = require('chai-http');
const app = require('../index.js');
const mongoose = require('mongoose');

const should = chai.should();


describe('User Tests', () => {
    chai.use(chaiHttp);
    before(() => {
        mongoose.connect('mongodb://localhost/imeal', () => {
        });

        var db = mongoose.connection;
        
        db.collection('meals').drop(function() {
            console.log("Dropping Meals");
        }) 
        db.collection('users').drop(function() {
            console.log("Dropping Meals");
        }) 
    })
    
    it('Should create a new user', done => {
        const userData = {
            username : "Test",
            password : "testpass"
        }
        chai.request('http://localhost:8080')
            .post('/signup')
            .send(userData)
            .end((err, res) => {
                res.should.have.status(201);
                res.body.should.be.a('object');
                res.body.should.have.property('message');
                res.body.should.have.property('newUser');
                done();               
            })
    })

    it('Should login a user', done => {
        const userData = {
            username : "Test",
            password : "testpass"
        }
        chai.request('http://localhost:8080')
            .post('/login')
            .send(userData)
            .end((err, res) => {
                res.should.have.status(200);
                res.body.should.be.a('object');
                res.body.should.have.property('message');
                res.body.should.have.property('token');
                done();               
            })
    })
})