const supertest = require('supertest');

const request = supertest('http://localhost:3001');
test('Responder na porta 3001', async () => {
  // Acessar a URL http://localhost:3001
  const res = await request.get('/');
  expect(res.status).toBe(200);
  // Verificar se a resposta foi 200
});
