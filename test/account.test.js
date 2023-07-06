const request = require('supertest');

const app = require('../src/app');

const MAIN_ROUTE = '/accounts';
let user;

const mail = `${Date.now()}@mail.com`;

beforeAll(async () => {
  const res = await app.services.user.save({
    name: 'User account',
    email: mail,
    password: '123456',
  });
  user = { ...res[0] };
});

test('Insert account', async () => {
  const res = await request(app).post(MAIN_ROUTE)
    .send({
      name: 'ACC1', user_id: user.id,
    });

  expect(res.status).toBe(201);
  expect(res.body.name).toBe('ACC1');
});
