const chai = require('chai');
const chaiHttp = require('chai-http');
const app = require('../index.js')

const should = chai.should();
console.log();


describe('User Tests', () => {
    chai.use(chaiHttp)
    
    it('Should create a new user', done => {
        const userData = {
            username : "Test User",
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
            username : "Test User",
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