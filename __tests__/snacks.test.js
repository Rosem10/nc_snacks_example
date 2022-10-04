const request = require('supertest');
const app = require('../app');
const db = require('../db');

afterAll(() => {
  if (db.end) db.end();
});

describe('GET /api/snacks', () => {
  test('status:200, responds with an array of snack objects', () => {
    return request(app)
      .get('/api/snacks')
      .expect(200)
      .then(({ body }) => {
        const { snacks } = body;
        expect(snacks).toBeInstanceOf(Array);
        expect(snacks).toHaveLength(6);
        snacks.forEach((snack) => {
          expect(snack).toMatchObject({
            snack_id: expect.any(Number),
            snack_name: expect.any(String),
            snack_description: expect.any(String)
          });
        });
      });
  });
});

describe('GET /api/drinks/drink_id', () => {
  test('200: responds with the requested drink data', () => {
    return request(app)
      .get('/api/drinks/1')
      .expect(200)
      .then(({ body }) => {
        const { drink } = body;
        expect(drink).toEqual({
          drink_id: 1,
          drink_name: 'Vimto',
          drink_description: `Manchester's finest`
        });
      });
  });
});

describe('POST /api/superheroes', () => {
  test('201: returns the snack object that has been added to the database', () => {
    const newSnack = {
      snack_name: 'Party Ring',
      snack_description: 'time for a party'
    };
    return request(app)
      .post('/api/snacks')
      .send(newSnack)
      .expect(201)
      .then((res) => {
        const { snack } = res.body;
        expect(snack).toEqual({
          snack_id: 7,
          ...newSnack
        });
      });
  });
});
