const request = require('supertest');

const app = require('../src/app');

test('List all users', () => request(app).get('/users').then((res) => {
  expect(res.status).toBe(200);
  expect(res.body).toHaveLength(1);
  expect(res.body[0]).toHaveProperty('name', 'John Doe');
}));

test('Create a new user', () => request(app).post('/users')
  .send({
    id: 2,
    name: 'Rafael C',
  })
  .then((res) => {
    expect(res.status).toBe(201);
    expect(res.body.id).toBe(2);
  }));
