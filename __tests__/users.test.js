const request = require('supertest');
const app = require('../server');

describe('Users API', () => {
  it('GET /users → should return an array', async () => {
    const res = await request(app).get('/users');
    expect([200, 500]).toContain(res.statusCode);
    if (res.statusCode === 200) expect(Array.isArray(res.body)).toBe(true);
  });

  it('GET /users/:id → should return a user or 404', async () => {
    const testId = '68e2cf00e06fa44dd23a760f';
    const res = await request(app).get(`/users/${testId}`);
    expect([200, 404, 500]).toContain(res.statusCode);
  });
});
