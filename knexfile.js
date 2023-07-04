module.exports = {
  test: {
    client: 'pg',
    version: '9.6',
    connection: {
      host: 'localhost',
      user: 'postgres',
      password: '123',
      database: 'gerenciamento',
    },
    pool: {
      min: 2,
      max: 20,
    },
    migrations: {
      directory: './database/migrations',
    },
  },
};
