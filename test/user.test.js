const chai = require('chai');
const chaiHttp = require('chai-http');
const app = require('../src/index');
const mongoose = require('mongoose');

const should = chai.should();

chai.use(chaiHttp);

describe('User Tests', () => {
    before(() => {
        var db = mongoose.connection;

        db.collection('meals').drop()
            .then(() => console.log("Dropping Meals"))
            .catch((err) => {
                if (err.code === 26) {
                    console.log(`namespace meals not found`);
                }
            });
        db.collection('users').drop()
            .then(() => console.log("Dropping Users"))
            .catch((err) => {
                if (err.code === 26) {
                    console.log(`namespace users not found`);
                }
            });
    });
    
    it('Should create a new user', done => {
        const userData = {
            username : "Test",
            password : "testpass"
        }
        chai.request(app)
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
        chai.request(app)
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