0. discuss potential errors - tldr
   GET 404 - valid non-existant,
   GET 400 - INVALID
1. recap - what is app.use() what does .next() do - passes to next piece of middleware
2. 500
   msg: internal server error - use lowerCase
   Safety net -> jest mocks
3. handle psql errors
   400 - /api/drinks/notAnId
   msg: bad request - use lowerCase

_const badRequests = ['22P02'];_
_if (badRequests.includes(err.code))_
Point out error message - not ours, inbuilt 4. custom errors
on top of others
_if (err.status && err.msg)_ in app
AND
_RETURN Promise.reject({status: 404, msg: })_
in model
