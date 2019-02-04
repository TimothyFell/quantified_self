const chai = require('chai');
const should = chai.should();
const chaiHttp = require('chai-http');
const environment = process.env.NODE_ENV || 'development';
const configuration = require('../../knexfile')[environment];
const database = require('knex')(configuration);

const server = require('../../server');

chai.use(chaiHttp);

describe('API Routes', () => {
  describe('GET /api/v1/meals/:id/foods', () => {

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


    it('should return the all the foods for a meal', done => {
        chai.request(server)
        .get('/api/v1/meals/1/foods')
        .end((err, response) => {
          response.should.have.status(200);
          response.should.be.json;
          response.body.should.have.property('id');
          response.body.should.have.property('meal');
          response.body.should.have.property('foods');
          response.body.foods.should.be.a('array');

          response.body.foods[0].should.have.property('id');
          response.body.foods[0].should.have.property('name');
          response.body.foods[0].should.have.property('calories');

          done();
        });
    });

    it('should throw a 404 if the request is send with an invalid meal ID', function (done) {
      chai.request(server)
        .get('/api/v1/meals/1000/foods')
        .end((err, response) => {
          response.should.have.status(404);
          response.should.be.json;
          done();
        });
    });
  });
  });
