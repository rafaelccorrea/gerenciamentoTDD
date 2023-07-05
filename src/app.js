// Importando e executando a função diretamente.
const app = require('express')();
// Gerenciador de arquivos para carregamento automatico
const consign = require('consign');
const knex = require('knex');
const knexfile = require('../knexfile');

app.db = knex(knexfile.test);

consign({ cwd: 'src', verbose: false })
  .include('./config/middlewares.js')
  .then('./routes')
  .then('./config/routes.js')
  .into(app);

app.get('/', (req, res) => {
  res.status(200).send('Server returned!');
});

module.exports = app;
