const chai = require('chai');
const should = chai.should();
const chaiHttp = require('chai-http');
const environment = process.env.NODE_ENV || 'development';
const configuration = require('../../knexfile')[environment];
const database = require('knex')(configuration);
const server = require('../../server');

chai.use(chaiHttp);

describe('API Routes', () => {
  describe('GET api/v1/foods/:id', () => {
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

    // happy path
    it("should return the requested food with attributes", done =>  {
      chai.request(server)
      .get("/api/v1/foods/1")
      .end((err, response) => {
        response.should.have.status(200);
        response.body.should.be.a("object");
        response.body.food.should.have.property("id");
        response.body.food.should.have.property("name");
        response.body.food.should.have.property("calories");
        response.body.food.name.should.equal("potatoir");
        response.body.food.calories.should.equal(1200);
        response.body.food.should.have.property("calories");
        done();
      });
    });

    // sad paths
    it("should throw a 404 error if the id does not exist", done => {
      chai.request(server)
      .get("/api/v1/foods/1919291")
      .end((err, response) => {
        response.should.have.status(404);
        done();
      });
    });

    it("should throw a 500 error if no id is provided", done => {
      chai.request(server)
      .get("/api/v1/foods/bob")
      .end((err, response) => {
        response.should.have.status(500);
        done();
      });
    });
  });
});
