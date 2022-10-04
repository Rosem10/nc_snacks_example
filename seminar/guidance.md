# Seminar Overview

The lecture will show how to write error handling middleware in express and how to test endpoints for errors.

## App setup

Yesterday's seminar worked through setting up and testing the happy path of an endpoint. Continue with the example from yesterday and work through writing tests and error handling the existing endpoint. If the group needs practice of building endpoints then consider making a new endpoint.

A complete solution can be found on this [branch](https://github.com/northcoders/be-nc-heros-seminar/tree/error-handling-solution)

## Discuss possible errors

Discuss the endpoint in question and how the client could make the request wrong. Discuss and decide on appropriate error codes for each incorrect request.

GET /api/superheroes/1 - 200 - OK
GET /api/superheroes/10000 - 404 - missing id
GET /api/superheroes/invalid_id - 400 - invalid id type

## Add an internal error handler

Before embarking on error handling the first thing they should do is setup a 500 error handler to make sure that our server doesn't crash when encountering unexpected errors.

```js
app.use((err, req, res, next) => {
  console.log(err, '<< unhandled err');
  res.status(500).send({ msg: 'internal server error' });
});
```

Note that it is generally a good idea to put this in at the start as a safety net even though we will not write tests specifically for it. (If they ask how to write a test for this point them to jest mocks.)

## Test a postgres error

Starting with a test that will be rejected by postgres is a good starting point as they usually find this easier to follow.

Write the test and make sure that it fails. At this point there should be a JS error as there is no `.catch` block.

```js
test('400: for an non-integer id', () => {
  return request(app)
    .get('/api/superheroes/notAnId')
    .expect(400)
    .then((res) => {
      expect(res.body.msg).toBe('bad request');
    });
});
```

Catch the error in the controller and work through invoking next to go to the next error handler.

```js
const { selectSuperHeroById } = require('../models/superheroes.models');

exports.getSuperheroById = (req, res, next) => {
  const { superhero_id } = req.params;
  selectSuperHeroById(superhero_id)
    .then((superhero) => {
      res.send({ superhero });
    })
    .catch((err) => {
      next(err);
    });
};
```

Feel free to refactor the catch to the shorter `.catch(next);` They will be used to passing callbacks as anonymous functions rather than named ones so this syntax may be confusing to them.

After this add in an error handler to deal with the error. Note that the logic used in here to identify the errors is up to them.

```js
app.use((err, req, res, next) => {
  const badReqCodes = ['22P02'];
  if (badReqCodes.includes(err.code)) {
    res.status(400).send({ msg: 'bad request' });
  } else {
    next(err);
  }
});
```

## Test a custom error

Write a test that will not throw a postgres error. Note that this request will succeed and come back with a 200 status code. Discuss why that is and how we to do make the model reject with a custom error.

```js
test('404: for an non-existent id', () => {
  return request(app)
    .get('/api/superheroes/1000')
    .expect(404)
    .then((res) => {
      expect(res.body.msg).toBe('superhero not found');
    });
});
```

Make the model reject when the query returns no results.

```js
exports.selectSuperHeroById = (superhero_id) => {
  return db
    .query(`SELECT * FROM superheroes WHERE superhero_id = $1`, [superhero_id])
    .then((result) => {
      if (result.rows.length === 0) {
        return Promise.reject({ status: 404, msg: 'superhero not found' });
      }
      return result.rows[0];
    });
};
```

Add in another middleware to handle custom errors. Note that they still need to call `next(err)` to make sure unknown errors are still handled.

```js
app.use((err, req, res, next) => {
  if (err.status && err.msg) {
    res.status(err.status).send({ msg: err.msg });
  } else {
    next(err);
  }
});
```

The error handlers can be left in `app.js` for now as there is another lecture on advanced error handling next week where they will be extracted out.
