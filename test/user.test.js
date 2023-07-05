const request = require('supertest');

const app = require('../src/app');

test('List all users', () => request(app).get('/users').then((res) => {
  expect(res.status).toBe(200);
  expect(res.body.length).toBeGreaterThan(0);
}));

test.only('Create a new user', () => {
  const mail = `${Date.now()}@mail.com`;
  return request(app).post('/users')
    .send({
      name: 'Jessica',
      email: mail,
      password: '123456',
    })
    .then((res) => {
      expect(res.status).toBe(201);
    });
});
