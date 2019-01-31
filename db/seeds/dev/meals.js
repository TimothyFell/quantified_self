exports.seed = function (knex, Promise) {

return knex.raw('TRUNCATE TABLE meals, foods, food_meals RESTART IDENTITY CASCADE')
  .then(() => {
    return Promise.all([
    knex('meals').insert({
      meal_type: 'Breakfast'
    })
    .then(meal => {
      return knex('foods').insert([
        { name: 'potatoir',
          calories: 1200  },
        {  name: 'Dolor',
          calories: 1  }
      ])
    })
    .then(foods => {
      return knex('food_meals').insert([
        {  meal_id: 1,
          food_id: 1  },
        {  meal_id: 1,
          food_id: 2  }
      ])
    })
    .then(() => console.log('Seeding complete!'))
    .catch(error => console.log(`Error seeding data: ${error}`))
    ])
  })
.catch(error => console.log(`Error seeding data: ${error}`));
};