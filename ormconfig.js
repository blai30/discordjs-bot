const environment = require('./src/config').environment;
const dbConfig = require('./src/config').dbConfig;

const entities = {
  development: 'src/entity/**/*.ts',
  production: 'dist/src/entity/**/*.js'
};

const migrations = {
  development: 'src/migration/**/*.ts',
  production: 'dist/src/migration/**/*.js'
};

const subscribers = {
  development: 'src/subscriber/**/*.ts',
  production: 'dist/src/subscriber/**/*.js'
};

module.exports = {
  type: 'mysql',
  host: dbConfig.host,
  port: dbConfig.port,
  username: dbConfig.username,
  password: dbConfig.password,
  database: dbConfig.database,
  synchronize: true,
  logging: false,
  entities: [
    entities[environment],
  ],
  migrations: [
    migrations[environment],
  ],
  subscribers: [
    subscribers[environment],
  ],
  cli: {
    entitiesDir: 'src/entity',
    migrationsDir: 'src/migration',
    subscribersDir: 'src/subscriber',
  },
};
