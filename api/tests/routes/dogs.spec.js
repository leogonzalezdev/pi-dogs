const request = require('supertest');
const app = require('../../src/routes/index');

it('should reply the GET method with status code 300', async () => {
  const res = await request(app).get('/dogs');
  expect(res.statusCode).toEqual(300);
});

it('should reply the GET method with a list of names', async () => {
  const res = await request(app).get('/');
  expect(res.body).toEqual(['Franco', 'Toni', 'Martu']);
});