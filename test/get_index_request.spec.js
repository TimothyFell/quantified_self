const chai = require('chai');
const should = chai.should();
const chaiHttp = require('chai-http');
const server = require('../server');

chai.use(chaiHttp);

describe('API Routes', () => {
  describe('get api/v1/foods', () => {
    it("should return all food entries in database", done =>  {
      chai.request(server)
      .get("/api/v1/foods")
      .end((err, response) => {
        response.should.have.status(200);
        var foods = JSON.parse(response.body)
        foods[0].should.have.property('id')
        foods[0].should.have.property('name')
        foods[0].should.have.property('calories')
        foods[0].name.should.equal('goodburger')
        foods[0].calories.should.equal(42)
        done();
      })
    });
  });
});
