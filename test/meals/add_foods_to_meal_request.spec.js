const pry = require('pryjs');
const chai = require('chai');
const should = chai.should();
const chaiHttp = require('chai-http');
const server = require('../../server');

const environment = process.env.NODE_ENV || 'development';
const configuration = require('../../knexfile')[environment];
const database = require('knex')(configuration);

chai.use(chaiHttp);

describe('API Routes', () => {
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

  describe('POST api/v1/meals/:meal_id/foods/:id', () => {

    it("should return a string informing us which food was added to what meal", done =>  {
      chai.request(server)
      .post("/api/v1/meals/1/foods/4")
      .end((err, response) => {
        response.should.have.status(201);
        response.body.should.be.a("object");
        response.body.should.have.property("message");
        response.body.message.should.equal("Successfully added Pizza to Breakfast");
        done();
      })
    });

    it('should return a status of 404 when the food your adding doenst exist', done => {
      chai.request(server)
      .post("/api/v1/meals/1/foods/100000000")
      .end((err, response) => {
        response.should.have.status(404);
        done();
      })
    })

    it('should return a status of 404 when the meal your adding doenst exist', done => {
      chai.request(server)
      .post("/api/v1/meals/1000000000/foods/1")
      .end((err, response) => {
        response.should.have.status(404);
        done();
      })
    })
  });
});
