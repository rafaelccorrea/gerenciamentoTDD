const request = require('supertest');

const app = require('../src/app');

const mail = `${Date.now()}@mail.com`;

test('List all users', () => request(app).get('/users').then((res) => {
  expect(res.status).toBe(200);
  expect(res.body.length).toBeGreaterThan(0);
}));

test('Should create user and encrypt password', async () => {
  const result = await request(app).post('/users')
    .send({
      name: 'Jessica',
      email: mail,
      password: '123456',
    });

  expect(result.status).toBe(201);

  const { id } = result.body;
  const userDB = await app.services.user.findOne({ id });
  expect(userDB.password).not.toBeUndefined();
  expect(userDB.password).not.toBe('123456');
});

test('User name not found!', () => request(app).post('/users')
  .send({
    email: mail,
    password: '123456',
  })
  .then((res) => {
    expect(res.status).toBe(400);
    expect(res.body.error).toBe('Name is required');
  }));

test('User email not found!', async () => {
  const result = await request(app).post('/users')
    .send({
      name: 'Jessica',
      password: '123456',
    });

  expect(result.status).toBe(400);
  expect(result.body.error).toBe('Email is required');
});

test('User password not found!', (done) => {
  request(app).post('/users')
    .send({
      name: 'Jessica',
      email: mail,
    })
    .then((res) => {
      expect(res.status).toBe(400);
      expect(res.body.error).toBe('Password is required');
      done();
    })
    .catch((err) => {
      done.fail(err);
    });
});

test('User email exists!', async () => {
  const result = await request(app).post('/users')
    .send({
      name: 'Jessica',
      email: mail,
      password: '123456',
    });
  expect(result.status).toBe(400);
  expect(result.body.error).toBe('Email exists already');
});
