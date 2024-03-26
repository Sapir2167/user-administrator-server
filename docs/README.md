# User Administration REST API Server

This server provides endpoints for interacting with various resources via a RESTful API.

## Installation

Before running the server, ensure you have the following prerequisites installed:

- Node.js
- npm
- MySQL ( The DB that was chosen for this server is mySQL. It was chosen for being more suitable for data stored with connections between diffrent future tables and complex DB selections that might be needed when handling user related data, maybe also activities, autority managment etc.)

To install dependencies and set up the development environment, follow these steps:

1. Clone the repository:

git clone https://github.com/Sapir2167/user-administrator-server.git

2. Navigate to the project directory:

cd user-administrator-server

3. Install dependencies:

npm install

4. Set up the database configuration:

   To set up the database for the Node.js server, follow the instructions provided in the [Database Setup](./database-setup.md) documentation.

## Usage

To start the server locally, run the following command:

npm start

Once the server is running, you can access the API endpoints at `http://localhost:3000`.

## API Documentation

The server is a REST API server which expose 3 endpoints:
POST http://localhost:3000/api/users/ - responsible to create a new user in the db
GET http://localhost:3000/api/users/ - responsible to get all users from the db
DELETE http://localhost:3000/api/users/:id - responsible to delte user by id from the db

## Securit

All passwords are being hashed before stored in the DB. For production application we will also need to add enforcment of HTTPS for all routes as an extra layer of protection, as well as a login screen to validate only authorized users and individuales are reaching our site.

## Testing

if we were developing a production server, we would need to run testing which will located inside src/test which is currently empty.
We will add both e2e tests, units testing, integration tests and security tests.

## Deployment

Before deploying the server to a production environment, make sure to configure the environment variables for production settings.
We would also use DB pool for better managing the conection to the DB.

## Retry Mechanism

The server supports retry mechanism, after DB connection failure occour it will retry sending requests wrapped by executeWithRetry function from db/retryUtil.ts
