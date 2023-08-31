// Importando e executando a função diretamente.
const app = require('express')();
// Gerenciador de arquivos para carregamento automatico
const consign = require('consign');
const knex = require('knex');
const knexfile = require('../knexfile');

app.db = knex(knexfile.test);

consign({ cwd: 'src', verbose: false })
  .include('./config/passport.js')
  .then('./config/middlewares.js')
  .then('./services')
  .then('./routes')
  .then('./config/routes.js')
  .into(app);

app.get('/', (req, res) => {
  res.status(200).send('Server returned!');
});

// Middleware
app.use((err, req, res, next) => {
  const { name, message, stack } = err;
  if (name === 'ValidationError') res.status(400).json({ error: message });
  else res.status(500).json({ name, message, stack });
  next(err);
});

module.exports = app;
