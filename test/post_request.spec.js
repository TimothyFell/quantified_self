const chai = require('chai');
const should = chai.should();
const chaiHttp = require('chai-http');
const server = require('../server');

chai.use(chaiHttp);

describe('API Routes', () => {
  describe('post api/v1/foods', () => {
    it("should create entry into database", done =>  {
      chai.request(server)
      .post("/api/v1/foods")
      .send({name: "goodburger", calories: 42})
      .end((err, response) => {
        var resp = JSON.parse(response.body)
        response.should.have.status(201);
        resp.should.be.a("object");
        resp.foods.should.have.property("id");
        resp.foods.should.have.property("name");
        resp.foods.should.have.property("calories");
        resp.foods.name.should.equal("goodburger");
        resp.foods.calories.should.equal(42);
        resp.foods.should.have.property("calories");
        done();
      })
    })
  }) 
});

