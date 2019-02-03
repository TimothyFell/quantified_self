const chai = require('chai');
const should = chai.should();
const chaiHttp = require('chai-http');
const server = require('../../server');

chai.use(chaiHttp);

describe('API Routes', () => {
  describe('POST api/v1/foods', () => {
    it("should create entry into database", done =>  {
      chai.request(server)
      .post("/api/v1/foods")
      .send({name: "goodburger", calories: 42})
      .end((err, response) => {
        var resp = JSON.parse(response.body)
        response.should.have.status(201);
        resp.should.be.a("object");
        resp.food.should.have.property("id");
        resp.food.should.have.property("name");
        resp.food.should.have.property("calories");
        resp.food.name.should.equal("goodburger");
        resp.food.calories.should.equal(42);
        resp.food.should.have.property("calories");
        done();
      })
    });

    it("Returns error if wrong attribute is sent", done =>  {
      chai.request(server)
      .post("/api/v1/foods")
      .send({good: "goodburger", calories: 42})
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
