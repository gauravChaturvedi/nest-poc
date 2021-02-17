module.exports = {
    type: 'postgres',
    host: 'localhost',
    port: 5432,
    username: 'gaurav_chaturvedi',
    password: '',
    database: 'nest_poc',
    entities: ['dist/**/*.model.js'],
    migrations: ['dist/src/database/migrations/*.js'],
    cli: {
      migrationsDir: 'src/database/migrations',
    },
  };