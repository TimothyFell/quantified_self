const pry = require('pryjs');

const chai = require('chai');
const should = chai.should();
const chaiHttp = require('chai-http');
const server = require('../../server');

chai.use(chaiHttp);

describe('API Routes', () => {
  describe('GET api/v1/meals', () => {
    it("should return each meal with their foods", done =>  {
      chai.request(server)
      .get("/api/v1/meals")
      .end((err,response) => {
        response.should.have.status(200);
        response.body.should.be.a("array");
        var first = response.body[0];
        first.should.be.a("object");
        first.should.have.property("id");
        first.id.should.equal(1);
        first.should.have.property("name");
        first.name.should.equal("Breakfast");
        first.should.have.property("foods");
        first.foods.should.be.a("array");
        first.foods.length.should.equal(2);
        first_food = first.foods[0];
        first_food.should.have.property("id");
        first_food.id.should.equal(1);
        first_food.should.have.property("name");
        first_food.name.should.equal("potatoir");
        first_food.should.have.property("calories");
        first_food.calories.should.equal(1200);
        done();
      })
    });
  });
});
