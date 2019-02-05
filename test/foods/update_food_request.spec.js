const chai = require('chai');
const should = chai.should();
const chaiHttp = require('chai-http');
const server = require('../../server');

const environment = process.env.NODE_ENV || 'development';
const configuration = require('../../knexfile')[environment];
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

  afterEach((done) => {
    database.seed.run()
      .then(() => done())
      .catch(error => {
        throw error;
      });
  });

  it('should update a food entry', (done) => {
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
        var food = response.body.food
        food.should.have.property('name');
        food.name.should.equal("new food");
        food.should.have.property('calories');
        food.calories.should.equal(222);
        done();
      });
  })

  it('should update a food entrys column', (done) => {
    chai.request(server)
      .patch('/api/v1/foods/1')
      .send({
        name: "Georgia"
      })
      .end((err, response) => {
        response.should.have.status(200);
        response.should.be.json;
        response.body.should.be.a('object');
        response.body.should.have.property('food');
        var food = response.body.food
        food.should.have.property('name');
        food.name.should.equal("Georgia");
        food.should.have.property('calories');
        food.calories.should.equal(1200);
        done();
      });
  })

  it('should throw a 400 and fail to update a food entry if a property is incorrect', (done) => {
    chai.request(server)
      .patch('/api/v1/foods/1')
      .send({
        burger: "BurgerBurger",
      })
      .end((err, response) => {
        response.should.have.status(400);
        response.should.be.json;
        done();
      });
  });

  it('should throw a 400 and fail to update a food entry if no properties are sent in', (done) => {
    chai.request(server)
      .patch('/api/v1/foods/1')
      .send({
      })
      .end((err, response) => {
        response.should.have.status(400);
        response.should.be.json;
        done();
      });
  });
});
