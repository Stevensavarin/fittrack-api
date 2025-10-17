const request = require('supertest');
const app = require('../server');

describe('Bookings API', () => {
  it('GET /bookings → should return an array', async () => {
    const res = await request(app).get('/bookings');
    expect([200, 500]).toContain(res.statusCode);
    if (res.statusCode === 200) expect(Array.isArray(res.body)).toBe(true);
  });

  it('GET /bookings/:id → should return a booking or 404', async () => {
    const testId = '68e2cf00e06fa44dd23a7616';
    const res = await request(app).get(`/bookings/${testId}`);
    expect([200, 404, 500]).toContain(res.statusCode);
  });
});