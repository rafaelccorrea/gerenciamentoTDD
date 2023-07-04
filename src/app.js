// Importando e executando a função diretamente.
const app = require('express')();

// Gerenciador de arquivos para carregamento automatico
const consign = require('consign');

consign({ cwd: 'src', verbose: false })
  .include('./config/middlewares.js')
  .then('./routes')
  .then('./config/routes.js')
  .into(app);

app.get('/', (req, res) => {
  res.status(200).send('Server returned!');
});

module.exports = app;
