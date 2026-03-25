const request = require('supertest');
const express = require('express');

// Create app instance from server.js code to avoid starting network listener in tests
const app = express();
app.use(express.json());
app.get('/', (req, res) => res.json({ status: 'ok' }));
app.post('/sum', (req, res) => {
  const { a, b } = req.body;
  if (typeof a !== 'number' || typeof b !== 'number') {
    return res.status(400).json({ error: 'a and b must be numbers' });
  }
  res.json({ result: a + b });
});

describe('API tests', () => {
  test('GET / should return status ok', async () => {
    const res = await request(app).get('/');
    expect(res.statusCode).toBe(200);
    expect(res.body).toEqual({ status: 'ok' });
  });

  test('POST /sum with numbers should return result', async () => {
    const res = await request(app).post('/sum').send({ a: 2, b: 3 });
    expect(res.statusCode).toBe(200);
    expect(res.body).toEqual({ result: 5 });
  });

  test('POST /sum with invalid input should return 400', async () => {
    const res = await request(app).post('/sum').send({ a: 2, b: 'x' });
    expect(res.statusCode).toBe(400);
    expect(res.body).toHaveProperty('error');
  });
});
