const chai = require('chai');
const should = chai.should();
const chaiHttp = require('chai-http');
const server = require('../server');

const environment = process.env.NODE_ENV || 'development';
const configuration = require('../knexfile')[environment];
const database = require('knex')(configuration);

chai.use(chaiHttp);


describe('PATCH /api/v1/foods/:id', () => {

    before((done) => {
      database.migrate.latest()
        .then(() => done())
        .catch(error => {
          throw error;
        });
    });

    beforeEach((done) => {
      database.seed.run()
        .then(() => done())
        .catch(error => {
          throw error;
        });
    });
  
    it('should update a food entry', (done) => {
      chai.request(server)
        .get('/api/v1/foods/1')
        .end((err, response) => {

          response.should.have.status(200);
          response.should.be.json;
          response.body[0].should.be.a('object');
          response.body[0].should.have.property('name');
          response.body[0].should.have.property('calories');
          response.body[0].name.should.equal('Pemmican');
          response.body[0].calories.should.equal('500');
        });

      chai.request(server)
        .patch('/api/v1/foods/1')
        .send({
          name: "new food",
          calories: 222
        })
        .end((err, response) => {
          response.should.have.status(200);
          response.should.be.json;
          response.body.should.be.a('object');
          response.body.should.have.property('food');
          response.body.food[0].should.have.property('name');
          response.body.food[0].should.have.property('calories');
        });
        
      chai.request(server)
        .get('/api/v1/foods/1')
        .end((err, response) => {
          
          response.should.have.status(200);
          response.should.be.json;
          response.body[0].should.be.a('object');
          response.body[0].should.have.property('name');
          response.body[0].should.have.property('calories');
          response.body[0].name.should.equal('new food');
          response.body[0].calories.should.equal(222);
          done();
        })
    })
  
  it('should throw a 400 and fail to update a food entry if a property is missing', (done) => {
    chai.request(server)
      .patch('/api/v1/foods/1')
      .send({
        name: "BurgerBurger",
      })
      .end((err, response) => {
        response.should.have.status(400);
        response.should.be.json;
        done();
      });
  });
});