const request = require('supertest');
const app = require('../src/app');

let email;

beforeEach(() => {
  email = `${Date.now()}@mail.com`;
});

test('should receive the token when logging in', async () => {
  // Criação de um usuário de teste
  await app.services.user.save({
    name: 'Test User',
    email,
    password: '123456',
  });

  // Fazendo o login com as credenciais do usuário
  const response = await request(app)
    .post('/auth/signin')
    .send({
      email,
      password: '123456',
    });

  // Verificando a resposta da requisição
  expect(response.status).toBe(200);
  expect(response.body).toHaveProperty('token');
});

test('should reject login password incorrect', async () => {
  // Criação de um usuário de teste
  await app.services.user.save({
    name: 'Test User',
    email,
    password: '123456',
  });

  // Fazendo o login com as credenciais do usuário
  const response = await request(app)
    .post('/auth/signin')
    .send({
      email,
      password: '556565',
    });

  // Verificando a resposta da requisição
  expect(response.status).toBe(400);
  expect(response.body.error).toBe('User or password incorrect!');
});

test('should reject login when user does not exist', async () => {
  // Fazendo o login com as credenciais do usuário
  const response = await request(app)
    .post('/auth/signin')
    .send({
      email: 'user@example.com',
      password: '556565',
    });

  // Verificando a resposta da requisição
  expect(response.status).toBe(400);
  expect(response.body.error).toBe('User or password incorrect!');
});
