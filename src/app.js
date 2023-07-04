// Importando e executando a função diretamente.
const app = require('express')();

app.get('/', (req, res) => {
  res.status(200).send('Server returned!');
});

module.exports = app;
