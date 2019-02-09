// Update with your config settings.

module.exports = {

  development: {
    client: 'pg',
    connection: "postgres://localhost/quantified_self_be",
    migrations: {
      directory: './db/migrations'
    },
    seeds: {
      directory: './db/seeds/dev'
    },
    useNullAsDefault: true
  },
  production: {
    client: 'pg',
    connection: "postgres://shyfiiginameca:1ea250574fa2ae444a6b3966f9b3c51e4cf7e820ba85e0c387e0241611e255b6@ec2-54-235-67-106.compute-1.amazonaws.com:5432/dc4i5c4cdvmlt6",
    migrations: {
      directory: './db/migrations'
    },
    seeds: {
      directory: './db/seeds/dev'
    },
    ssl: true
  }

};
