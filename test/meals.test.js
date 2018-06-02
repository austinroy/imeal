const chai = require('chai');
const chaiHttp = require('chai-http');
const app = require('../index.js');

const should = chai.should();
console.log();


describe('Meal Tests', () => {
    chai.use(chaiHttp);


    it('Add a meal', done => {
        const userData = {
            username : "Test",
            password : "testpass"
        }
        chai.request('http://localhost:8080')
            .post('/login')
            .send(userData)
            .end((err, res) => {
                const userId = res.body.user.id
                const token = res.body.token
                const mealData ={
                    name : "Steak",
                    category : "Protein",
                    amount : '2 Kg'
                }
                chai.request(`http://localhost:8080/${userId}/meals`)
                    .post('')
                    .set('x-access-token',token)
                    .send(mealData)
                    .end((err, res) => {  
                        res.should.have.status(201);
                        res.body.should.be.a('object');
                        res.body.should.have.property('message');
                        res.body.should.have.property('meal');
                        done();               
                })         
            })
            }
        )

        it('Get User Meals', done => {
            const userData = {
                username : "Test",
                password : "testpass"
            }
            chai.request('http://localhost:8080')
                .post('/login')
                .send(userData)
                .end((err, res) => {
                    const userId = res.body.user.id
                    const token = res.body.token
                    const mealData ={
                        name : "Steak",
                        category : "Protein",
                        amount : '2 Kg'
                    }
                    chai.request(`http://localhost:8080/${userId}/meals`)
                        .get('')
                        .set('x-access-token',token)
                        .send(mealData)
                        .end((err, res) => {   
                            res.should.have.status(200);
                            res.body.should.be.a('array');
                            done();               
                    })         
                })
                }
            )

            it('Update Meal', done => {
                const userData = {
                    username : "Test",
                    password : "testpass"
                }
                chai.request('http://localhost:8080')
                    .post('/login')
                    .send(userData)
                    .end((err, res) => {
                        const userId = res.body.user.id
                        const token = res.body.token
                        const mealData ={
                            name : "Steak",
                            category : "Protein",
                            amount : '2 Kg'
                        }
                        chai.request(`http://localhost:8080/${userId}/meals`)
                            .get('')
                            .set('x-access-token',token)
                            .send(mealData)
                            .end((err, res) => {
                                const meal_id = res.body[0]._id;
                                const mealDataUpdate ={
                                    name : "Steak",
                                    category : "Protein",
                                    amount : '5 Kg'
                                }
                                chai.request(`http://localhost:8080/${userId}/meals/${meal_id}`)
                                    .put('')
                                    .set('x-access-token',token)
                                    .send(mealDataUpdate)
                                    .end((err, res) => {  
                                        res.should.have.status(200);
                                        res.body.should.be.a('object');
                                        res.body.should.have.property('message');
                                        res.body.should.have.property('meal');
                                        done()
                                    })        
                        })         
                    })
                    }
                )

                it('Update Meal', done => {
                    const userData = {
                        username : "Test",
                        password : "testpass"
                    }
                    chai.request('http://localhost:8080')
                        .post('/login')
                        .send(userData)
                        .end((err, res) => {
                            const userId = res.body.user.id
                            const token = res.body.token
                            const mealData ={
                                name : "Steak",
                                category : "Protein",
                                amount : '2 Kg'
                            }
                            chai.request(`http://localhost:8080/${userId}/meals`)
                                .get('')
                                .set('x-access-token',token)
                                .send(mealData)
                                .end((err, res) => {
                                    const meal_id = res.body[0]._id;
                                    const mealDataUpdate ={
                                        name : "Steak",
                                        category : "Protein",
                                        amount : '5 Kg'
                                    }
                                    chai.request(`http://localhost:8080/${userId}/meals/${meal_id}`)
                                        .delete('')
                                        .set('x-access-token',token)
                                        .send(mealDataUpdate)
                                        .end((err, res) => {  
                                            res.should.have.status(200);
                                            res.body.should.be.a('object');
                                            res.body.should.have.property('message');
                                            done()
                                        })        
                            })         
                        })
                        }
                    )
})
