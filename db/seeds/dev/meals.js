exports.seed = function (knex, Promise) {

return knex.raw('TRUNCATE TABLE meals, foods, food_meals RESTART IDENTITY CASCADE')
  .then(() => {
    return Promise.all([
    knex('meals').insert([{
      meal_type: 'Breakfast'
    },{
      meal_type:'Lunch'
    }])
    .then(meal => {
      return knex('foods').insert([
        { name: 'potatoir',
          calories: 1200  },
        {  name: 'Dolor',
          calories: 1  },
        { name: 'Chips',
          calories: 8  },
        {  name: 'Pizza',
          calories: 1000  }
      ])
    })
    .then(foods => {
      return knex('food_meals').insert([
        {  meal_id: 1,
          food_id: 1  },
        {  meal_id: 1,
          food_id: 2  },
        {  meal_id: 2,
          food_id: 3  },
        {  meal_id: 2,
          food_id: 4  }
      ])
    })
    .then(() => console.log('Seeding complete!'))
    .catch(error => console.log(`Error seeding data: ${error}`))
    ])
  })
.catch(error => console.log(`Error seeding data: ${error}`));
};
