# Quantified Self Backend API

This is an Express app that serves an API as a backend for a separate service to consume and serve a user experience to our users.


## Setup

### Clone
As always start by forking the repo, cloning it to your machine and cd-ing into the new repository in your terminal.

````terminal
$ git clone git@github.com:TimothyFell/quantified_self_backend.git quantified_self_backend
$ cd quantified_self_backend
````

### Tech Stack
We used Node.js with Knex and Express to build a database of foods and meals and serve that data to other services via an API using Express.

### NPM
Use NPM to install all the required packages.

````terminal
$ npm install
$ npm audit fix
````

### Create Postgresql Database
Create database to store foods and meals. There is a seed file with some example data.

````terminal
$ createdb quantified_self_be
$ knex migrate:latest
$ knex seed:run
````

## Contributions

If you would like to contribute to this project please fork the repository and send us a pull request with your changes. To get started once you fork, follow the instructions above in the Setup section.


## Configuration
  There are a few more steps before you can get the tests up and running.

### API's

No external API's were used.

## Running Tests
Now you are ready to run the tests! Use the following command to run all your tests.

````terminal
$ npm test
````

or this command to run a specific file or directory.

````terminal
$ mocha ./spec/path/to/file/or/directory --exit
````

## API Endpoints

### 1. Add a food to the database
  #### Verb /Path: POST /api/v1/foods
  #### Headers:
  ````javascript
  // nothing
  ````
  #### Params:
  ````javascript
  // nothing
  ````
  #### Body:
  ````javascript
    { "food": { "name": "Name of food here", "calories": "Calories here"} }
  ````
  #### Response:
  ````javascript
  { "food": { "name": "Name of food here", "calories": "Calories here"} }
  ````

### 2. Get a list of all foods
  #### Verb /Path: GET /api/v1/foods
  #### Headers:
  ````javascript
  // nothing
  ````
  #### Params:
  ````javascript
  // nothing
  ````
  #### Body:
  ````javascript
  // nothing
  ````
  #### Response:
  ````javascript
  [{
    "id": 1,
    "name": "Banana",
    "calories": 150
  },
  {
    "id": 2,
    "name": "Berry",
    "calories": 10
  },
  {
    "id": 3,
    "name": "Steak",
    "calories": 450
  }]
  ````

### 3. Get a single food
  #### Verb /Path: GET /api/v1/foods/:id
  #### Headers:
  ````javascript
  // nothing
  ````
  #### Params:
  ````javascript
  // nothing
  ````
  #### Body:
  ````javascript
  // nothing
  ````
  #### Response:
  ````javascript
  {
    "id": 3,
    "name": "Steak",
    "calories": 450
  }
  ````

### 4. Update a single food
  #### Verb /Path: Patch /api/v1/foods/:id
  #### Headers:
  ````javascript
  // nothing
  ````
  #### Params:
  ````javascript
  // nothing
  ````
  #### Body:
  ````javascript
  {
    "name": "new name here",
    "calories": 120
  }
  ````
  #### Response:
  ````javascript
  {
    "id": 3,
    "name": "new name here",
    "calories": 120
  }
  ````

### 5. Get all meals
  #### Verb /Path: GET /api/v1/meals
  #### Headers:
  ````javascript
  // nothing
  ````
  #### Params:
  ````javascript
  // nothing
  ````
  #### Body:
  ````javascript
  // nothing
  ````
  #### Response:
  ````javascript
  [
    {
        "id": 1,
        "name": "Breakfast",
        "foods": [
            {
                "id": 1,
                "name": "Banana",
                "calories": 150
            },
            {
                "id": 6,
                "name": "Yogurt",
                "calories": 550
            },
            {
                "id": 12,
                "name": "Apple",
                "calories": 220
            }
        ]
    },
    // repeated for each meal and their foods
  ]
  ````

### 6. Get a single meal
  #### Verb /Path: GET /api/v1/meals/:id
  #### Headers:
  ````javascript
  // nothing
  ````
  #### Params:
  ````javascript
  // nothing
  ````
  #### Body:
  ````javascript
  // nothing
  ````
  #### Response:
  ````javascript
  {
      "id": 1,
      "name": "Breakfast",
      "foods": [
          {
              "id": 1,
              "name": "Banana",
              "calories": 150
          },
          {
              "id": 6,
              "name": "Yogurt",
              "calories": 550
          },
          {
              "id": 12,
              "name": "Apple",
              "calories": 220
          }
      ]
  }
  ````

### 7. Add a food to a meal
  #### Verb /Path: POST /api/v1/meals/:meal_id/foods/:food_id
  #### Headers:
  ````javascript
  // nothing
  ````
  #### Params:
  ````javascript
  // nothing
  ````
  #### Body:
  ````javascript
  // nothing
  ````
  #### Response:
  ````javascript
  {
    "message": "Successfully added FOODNAME to MEALNAME"
  }
  ````
