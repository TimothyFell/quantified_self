const chai = require('chai');
const should = chai.should();
const chaiHttp = require('chai-http');
const server = require('../server');

const environment = process.env.NODE_ENV || 'development';
const configuration = require('../knexfile')[environment];
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


  describe('POST api/v1/foods', () => {
    it("should create entry into database", done =>  {
      chai.request(server)
      .post("/api/v1/foods")
      .send({name: "potatoir", calories: 1200})
      .end((err, response) => {
        var resp = JSON.parse(response.body)
        response.should.have.status(201);
        resp.should.be.a("object");
        resp.food.should.have.property("id");
        resp.food.should.have.property("name");
        resp.food.should.have.property("calories");
        resp.food.name.should.equal("potatoir");
        resp.food.calories.should.equal(1200);
        resp.food.should.have.property("calories");
        done();
      })
    });

    it("Returns error if wrong attribute is sent", done =>  {
      chai.request(server)
      .post("/api/v1/foods")
      .send({gosod: "potatoir", calories: 1200})
      .end((err, response) => {
        response.should.have.status(406);
        response.body.error.should.equal('Expected format: { name: <String>, calories: <String> }. You\'re missing a "name" property.');
        done();
      })
    });

    it("Returns error if no attributes are sent", done =>  {
      chai.request(server)
      .post("/api/v1/foods")
      .send({})
      .end((err, response) => {
        response.should.have.status(406);
        response.body.error.should.equal('Expected format: { name: <String>, calories: <String> }. You\'re missing a "name" property.');
        done();
      })
    });
  });
});
