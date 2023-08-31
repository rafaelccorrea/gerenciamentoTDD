const request = require('supertest');
const jwt = require('jwt-simple');

const app = require('../src/app');

const MAIN_ROUTE = '/accounts';
let user;

const mail = `${Date.now()}@mail.com`;

const secret = 'secret!';

beforeAll(async () => {
  const res = await app.services.user.save({
    name: 'User account',
    email: mail,
    password: '123456',
  });
  user = { ...res[0] };
  user.token = jwt.encode(user, secret);
});

test('Insert account', async () => {
  const res = await request(app).post(MAIN_ROUTE)
    .send({
      name: 'ACC1', user_id: user.id,
    }).set('authorization', `bearer ${user.token}`);

  expect(res.status).toBe(201);
  expect(res.body.name).toBe('ACC1');
});

test('Name user not found', () => request(app).post(MAIN_ROUTE)
  .send({
    user_id: user.id,
  }).set('authorization', `bearer ${user.token}`)
  .then((res) => {
    expect(res.status).toBe(400);
    expect(res.body.error).toBe('Name is required');
  }));

test('Find all accounts', () => app.db('accounts')
  .insert({ name: 'ACC LIST', user_id: user.id })
  .then(() => request(app).get(MAIN_ROUTE).set('authorization', `bearer ${user.token}`))
  .then((res) => {
    expect(res.status).toBe(200);
    expect(res.body.length).toBeGreaterThan(0);
  }));

test('Find By Id Account', () => app.db('accounts')
  .insert({
    name: 'ACC by id', user_id: user.id,
  }, ['id'])
  .then((acc) => request(app).get(`${MAIN_ROUTE}/${acc[0].id}`).set('authorization', `bearer ${user.token}`))
  .then((res) => {
    expect(res.status).toBe(200);
    expect(res.body.name).toBe('ACC by id');
    expect(res.body.user_id).toBe(user.id);
  }));

test('Update account', () => app.db('accounts')
  .insert({
    name: 'ACC by id', user_id: user.id,
  }, ['id'])
  .then((acc) => request(app).put(`${MAIN_ROUTE}/${acc[0].id}`).set('authorization', `bearer ${user.token}`)
    .send({
      name: 'UPDATED ACC',
    }))
  .then((res) => {
    expect(res.status).toBe(200);
    expect(res.body.name).toBe('UPDATED ACC');
  }));

test('Delete account', () => app.db('accounts')
  .insert({
    name: 'Delete account',
    user_id: user.id,
  }, ['id'])
  .then((acc) => request(app).delete(`${MAIN_ROUTE}/${acc[0].id}`).set('authorization', `bearer ${user.token}`))
  .then((res) => {
    expect(res.status).toBe(204);
  }));
