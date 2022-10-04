const app = require('../app.js')
const request = require("supertest")

describe('GET /api/drinks/:id', () => {

  afterAll(() => {
    return db.end()
  })

  test('respond with 200 status code', () => {
    return request(app).get('/api/drinks/1').expect(200)
  });
  test('responds with requested object with expected properties', () => {
    return request(app).get('/api/drinks/1').then(({body}) => {
      expect(body.drink).toEqual({
        drink_id: 1, 
        drink_name: 'Vimto', 
        drink_description: "Manchester's finest"
      })
    })
  })
});
