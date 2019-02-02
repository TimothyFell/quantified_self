// const pry = require('pryjs');

const express = require('express');
const app = express();
const bodyParser = require('body-parser');

const environment = process.env.NODE_ENV || 'development';
const configuration = require('./knexfile')[environment];
const database = require('knex')(configuration);

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: true
}));
app.set('port', process.env.PORT || 3000);
app.locals.title = 'quantified_self_be';

app.listen(app.get('port'), () => {
  console.log(`${app.locals.title} is running on ${app.get('port')}.`);
});

// API Endpoints

app.post('/api/v1/foods', (request, response) => {
  const food = request.body;

  for (let requiredParameter of ['name', 'calories']) {
    if (!food[requiredParameter]) {
      return response
        .status(406)
        .send({
          error: `Expected format: { name: <String>, calories: <String> }. You're missing a "${requiredParameter}" property.`
        });
    }
  }

  database('foods').insert(food, ['id', 'name', 'calories'])
    .then(food => {
      response.status(201).json(JSON.stringify({
        food: food[0]
      }))
    })
    .catch(error => {
      response.status(400).json({
        error
      });
    });
});

app.get('/api/v1/foods', (request, response) => {
  database('foods').select()
  .then((foods) => {
    response.status(200).json(JSON.stringify(foods));
  })
  .catch((error) => {
    response.status(500).json({ error });
  });
});

app.get('/api/v1/foods/:id', (request, response) => {
  database('foods').where('id', request.params.id).select()
    .then((food) => {
      if (food.length) {
        var returned_food = {food: food[0]}
        response.status(200).json(returned_food);
      } else {
        response.status(404).json("Not Found");
      }
    })
    .catch((error) => {
      response.status(500).json({ error });
    });

  app.patch('/api/v1/foods/:id', (request, response) => {
    const food = request.body;
    for (let requiredParameter of ['name', 'calories']) {
      if (!food[requiredParameter]) {
        return response
          .status(400)
          .send({
            error: `Expected format: { name: <String>, calories: <Integer> }. You're missing a "${requiredParameter}" property.`
          });
      }
    }
    database('foods').where('id', request.params.id).select().update({
        "name": food.name,
        "calories": food.calories
      }, '*')
      .then(food => {
        response.status(200).json({
          food
        });
      })
      .catch(error => {
        response.status(400).json({
          error
        });
      });
    });
});


module.exports = app;
