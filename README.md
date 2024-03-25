if we were developing a production server, we would need to run testing which will located inside src/test which is currently empty.
We will add both e2e tests, units testing, integration tests and security tests.

We use .env variables to be able to support more environments such testing env, production env etc.

The server is a REST API server which expose 3 endpoints:
POST http://localhost:3000/ - responsible to create a new user in the db
GET http://localhost:3000/ - responsible to get all users from the db
DELETE http://localhost:3000/:id - responsible to delte user by id from the db

The server supports retry mechanism, after DB connection failure occour it will retry sending requests wrapped by executeWithRetry function from db/retryUtil.ts

The DB that was chosen for this server is mySQL. It was chosen for being more suitable for data stored with connections between diffrent future tables and complex DB selections that might be needed when handling user related data, maybe also activities, autority managment etc.
