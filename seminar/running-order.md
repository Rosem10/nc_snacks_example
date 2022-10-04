0. discuss potential errors - tldr
   GET 404 - valid non-existant,
   GET 400 - INVALID
1. recap - what is app.use() what does .next() do - passes to next piece of middleware
2. Internal Server Error
3. handle psql errors
4. custom errors
5. tests
   GET 404 - valid non-existant,
   GET 400 - INVALID

   if (!user) {
   return Promise.reject({
   status: 404,
   msg: 'Superhero not found'
   });
   }

6. POST 400 - NOT NULL CONSTRAINTS

_Can't test for 500 err without custom error handlers_
