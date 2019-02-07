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

app.use(function (request, response, next) {
  response.header("Access-Control-Allow-Origin",
    "*");
  response.header("Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept");
  response.header("Access-Control-Allow-Methods",
    "GET, POST, PATCH, DELETE, OPTIONS");
  next();
});

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
});

app.patch('/api/v1/foods/:id', (request, response) => {
  const {name, calories} = request.body;

  database('foods').where('id', request.params.id)
  .select().update({name, calories}, '*')
  .then(food => {
    response.status(200).json(
      {"food": food[0]}
    );
  })
  .catch(error => {
    response.status(400).json({
      error
    });
  });
});

app.get('/api/v1/meals', (request, response) => {
  database('meals')
  .join('food_meals', 'food_meals.meal_id', '=', 'meals.id')
  .join('foods', 'food_meals.food_id', '=', 'foods.id')
  .select('meals.id as meal_i_d', 'meals.meal_type as meal_type', 'foods.id as id', 'foods.name as name', 'calories')
  .then(foods => {
    var meals = [];
    foods.forEach( (f) => {
      if (meals.every(function (m) {
        return m.id != f.meal_i_d;
      })) {
        meals.push({
          'id': f.meal_i_d,
          "name": f.meal_type,
          "foods": [{'id': f.id,
                    'name': f.name,
                    'calories': f.calories}]
        })
      } else {
        var found_meal = meals.find(function (m) {
          return m.id == f.meal_i_d
        })
        found_meal.foods.push({
          'id': f.id,
          'name': f.name,
          'calories': f.calories
        })
      }
    });
    response.status(200).json(meals);
  })
  .catch((error) => {
    response.status(500).json({ error });
  });
});

app.get('/api/v1/meals/:meal_id/foods', (request, response) => {

  database('food_meals').where('meal_id', request.params.meal_id)
  .join('foods', 'food_meals.food_id', '=', 'foods.id')
  .join('meals', 'food_meals.meal_id', '=', 'meals.id')
  .select('foods.id AS id', 'foods.name AS name', 'calories', 'meals.meal_type AS meal_name', 'meals.id AS meal_id ')
  .then(foods => {
    let foods_for_meal = [];

    let meal_name = foods[0].meal_name;
    foods.forEach((f) => {
      delete f.meal_name;
      foods_for_meal.push(f)
    });

    response.status(200).json({
      'id': request.params.meal_id,
      'meal': meal_name,
      'foods': foods_for_meal
    })
  })
  .catch((error) => {
    response.status(404).json({
      error
    });
  });
});

app.post('/api/v1/meals/:meal_id/foods/:food_id', (request, response) => {

  database('food_meals').insert({
    'food_id': parseInt(request.params.food_id),
    'meal_id': parseInt(request.params.meal_id)
  }, '*')
  .then(food_meal => {
    return database('food_meals')
    .where('food_meals.id', food_meal[0].id)
    .join('foods', 'food_meals.food_id', '=', 'foods.id')
    .join('meals', 'food_meals.meal_id', '=', 'meals.id')
    .select('foods.name AS food_name', 'meals.meal_type AS meal_name')
  })
  .then(names => {
    response.status(201).json({
      'message': `Successfully added ${names[0].food_name} to ${names[0].meal_name}`
    })
  })
  .catch((error) => {
    response.status(404).json({'error': 'One of the ids sent was indvalid' })
  })
});



module.exports = app;
