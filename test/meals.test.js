const chai = require('chai');
const chaiHttp = require('chai-http');
const app = require('../src/index.js');

const should = chai.should();

describe('Meal Tests', () => {
  chai.use(chaiHttp);


  it('Add a meal', (done) => {
    const userData = {
      username: 'Test',
      password: 'testpass',
    };
    chai.request(app)
      .post('/login')
      .send(userData)
      .end((err, res) => {
        const userId = res.body.user.id;
        const { token } = res.body;
        const mealData = {
          name: 'Steak',
          category: 'Protein',
          amount: '2 Kg',
        };
        chai.request(app)
          .post(`/${userId}/meals`)
          .set('x-access-token', token)
          .send(mealData)
          .end((err, res) => {
            res.should.have.status(201);
            res.body.should.be.a('object');
            res.body.should.have.property('message');
            res.body.should.have.property('meal');
            done();
          });
      });
  });

  it('Get User Meals', (done) => {
    const userData = {
      username: 'Test',
      password: 'testpass',
    };
    chai.request(app)
      .post('/login')
      .send(userData)
      .end((err, res) => {
        const userId = res.body.user.id;
        const { token } = res.body;
        const mealData = {
          name: 'Steak',
          category: 'Protein',
          amount: '2 Kg',
        };
        chai.request(app)
          .get(`/${userId}/meals`)
          .set('x-access-token', token)
          .send(mealData)
          .end((err, res) => {
            res.should.have.status(200);
            res.body.should.be.a('array');
            done();
          });
      });
  });

  it('Update Meal', (done) => {
    const userData = {
      username: 'Test',
      password: 'testpass',
    };
    chai.request(app)
      .post('/login')
      .send(userData)
      .end((err, res) => {
        const userId = res.body.user.id;
        const { token } = res.body;
        const mealData = {
          name: 'Steak',
          category: 'Protein',
          amount: '2 Kg',
        };
        chai.request(app)
          .get(`/${userId}/meals`)
          .set('x-access-token', token)
          .send(mealData)
          .end((err, res) => {
            const mealId = res.body[0]._id;
            const mealDataUpdate = {
              name: 'Steak',
              category: 'Protein',
              amount: '5 Kg',
            };
            chai.request(app)
              .put(`/${userId}/meals/${mealId}`)
              .set('x-access-token', token)
              .send(mealDataUpdate)
              .end((err, res) => {
                res.should.have.status(200);
                res.body.should.be.a('object');
                res.body.should.have.property('message');
                res.body.should.have.property('meal');
                done();
              });
          });
      });
  });

  it('Update Meal', (done) => {
    const userData = {
      username: 'Test',
      password: 'testpass',
    };
    chai.request(app)
      .post('/login')
      .send(userData)
      .end((err, res) => {
        const userId = res.body.user.id;
        const { token } = res.body;
        const mealData = {
          name: 'Steak',
          category: 'Protein',
          amount: '2 Kg',
        };
        chai.request(app)
          .get(`/${userId}/meals`)
          .set('x-access-token', token)
          .send(mealData)
          .end((err, res) => {
            const mealId = res.body[0]._id;
            const mealDataUpdate = {
              name: 'Steak',
              category: 'Protein',
              amount: '5 Kg',
            };
            chai.request(app)
              .delete(`/${userId}/meals/${mealId}`)
              .set('x-access-token', token)
              .send(mealDataUpdate)
              .end((err, res) => {
                res.should.have.status(200);
                res.body.should.be.a('object');
                res.body.should.have.property('message');
                done();
              });
          });
      });
  });
});
