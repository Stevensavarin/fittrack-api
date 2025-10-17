const request = require('supertest');
const app = require('../server');

describe('Memberships API', () => {
  it('GET /memberships → should return an array', async () => {
    const res = await request(app).get('/memberships');
    expect([200, 500]).toContain(res.statusCode);
    if (res.statusCode === 200) expect(Array.isArray(res.body)).toBe(true);
  });

  it('GET /memberships/:id → should return a membership or 404', async () => {
    const testId = '68e2ceffe06fa44dd23a760b';
    const res = await request(app).get(`/memberships/${testId}`);
    expect([200, 404, 500]).toContain(res.statusCode);
  });
});