exports.up = function (knex, Promise) {
  return Promise.all([
    knex.schema.createTable('food_meals', function (table) {
      table.increments('id').primary();
      table.integer('food_id').unsigned().references('id').inTable('foods');
      table.integer('meal_id').unsigned().references('id').inTable('meals');
      table.timestamps(true, true);
    })
  ])
};

exports.down = function (knex, Promise) {
  return Promise.all([
    knex.schema.dropTable('food_meals')
  ]);
};