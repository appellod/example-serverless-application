# Typescript RESTful API
This is an open-source RESTful API designed to give Typescript developers a solid
starting point for creating backend applications.

## Features

**Login and Account Recovery**
Signup, login, and logout endpoints are provided without any configuration required.
A two-step password recovery process is also included. A user can request a password
reset which will email the user a link to enter a new password. Signup, login,
logout, and password recovery endpoints include full test coverage.

**Token-Based Authentication**
Any route can be protected by token-based authentication. Any request to a
secured route must include a valid access token in the Authorization HTTP
header. Tokens expire after 30 days. Any invalid tokens will receive a 401 Unauthorized
HTTP response. Tokens are automatically removed from Mongo when they expire to keep queries
running efficiently.

**API Documentation Generator**
The API uses ApiDoc to generate API documentation based on in-line comments
before each API endpoint. Full documentation is included for all authentication
endpoints such as signup, login and logout. Documentation is easily updated
using a single command. Documentation also requires that a user logs in to
view the documentation, providing security for sensitive information.

**Passport**
Authentication is performed using Passport. The default authentication strategy
is the Bearer strategy which allows basic token-based authentication. Other
Passport strategies such as Facebook or Google authentication can easily be
added if needed.

**MongoDB**
MongoDB is the chosen data store to allow rapid prototyping without having to worry about constantly
creating and changing migrations while experimenting with new implementations. Migrations are built-in
to allow index management and data transformation if needed.

**Mongoose**
All database calls are performed using Mongoose, an ORM for MongoDB. By utilizing an ORM,
developers can see Intellisense as they're working with their data to give them more insight
into database fields and types. Mongoose also allows many useful features such as pre- and post-save
hooks, and static- and instance-level functions to provide even more development efficiency!

**Socket.IO Authentication and User-based Broadcasting with Redis**
Users can connect to Socket.IO and authenticate their connection. This allows us to send
them push notifications based on their identity. Supports multiple connection from a single user.
Uses Redis to allow distributed communications between servers.

**Cloud-based Log Management with Loggly**
By simply including your Loggly API key, subdomain, and tags, all console output will be sent to
Loggly to allow centralized log management and application monitoring.

**Thorough Test Suite**
Included test suite is ready to test any model or controller in your application.
Tests are performed using Mocha. Redis and all database collections are cleared before
each test to make sure that every test uses fresh data. Helper method is
included for easily testing both secured and unsecured API endpoints.

**End-to-End API Tests**
Included test suite performs end-to-end testing on all API routes to make sure users
experience what's intended.

**Test Coverage Reports**
Generate test coverage reports by simply running `npm run test:coverage`.

**Docker Ready**
A Dockerfile is included and is ready to run the application out-of-the-box.


## Quickstart

**Clone**
```
git clone https://github.com/appellod/restful-api
```

**Install NPM Modules**
```
npm install
```

**Run MongoDB and Redis with Docker Compose**
You can start up any development dependencies such as MongoDB using:
```
docker-compose up
```

**Setup Environment Variables**
All variables are declared inside a root-level `settings.sh` file. You can use the existing `settings.example.sh`
as a template. Update all the variables here such as external API keys, local ports, etc.

A `settings.test.sh` can also need to be created to run your test suite. If this file doesn't exist, the test suite
will default to your `settings.sh` file.

**Run Test Suite**
The test suite uses [Mocha](https://mochajs.org/). Make sure a local MongoDB instance is running and run
the test suite using:
```
npm test
```
All tests should pass with a fresh install of the API.

**Start the API**
```
npm start
```

**Setup Mailgun**
In order for the password reset process to work, you need to create a free
account at [Mailgun](https://www.mailgun.com/). Mailgun is a very easy-to-use
email service that is free up to 10,000 emails per month. Once you registered,
enter your credentials in the application's configuration file for each
environment, or at the very least, the test and local environments.

**Setup Loggly**
The API comes complete with [Loggly](https://www.loggly.com) support. Simply create an account and enter your
customer token, subdomain, and tags in the environment configurations you want supported.

## Working on the API

**Updating the API Documentation**
API documentation is generated from in-line comments within the source code with [apidoc](http://apidocjs.com/).

To generate or update your API documentation, run:
```
npm run documentation
```
Your application may need to be restarted to see the updates.

Documentation can be versioned so developers can see the changes between versions. For this reason,
documentation can be included with Git commits by removing the `src/documentation/public/apidoc*` entry in the
.gitignore file.

**Accessing the Documentation**
The default location for the API documentation is at
[http://localhost:3000](http://localhost:3000). The default credentials for the
documentation are:
```
email: test@example.com
password: password
```
Entering the above credentials should allow you access to the documentation.

**MongoDB Migrations**
Migrations are performed with the [mongodb-migrations](https://github.com/emirotin/mongodb-migrations) NPM module.
Any configurations you need to make can be done in the `mm-config.js` file.

To create a migration file, run:
```
npm run migrations:create -- [migration-name]
```
This will create a migration file in the mongodb-migration directory. These migrations should be used for renaming
field keys or adding or removing indexes.

Migrations can be run with:
```
NODE_ENV=local npm run migrations
```
This will run all migrations on the environment specified by NODE_ENV (local in this example). Migrations will be saved
to the schemaMigrations collection within MongoDB.

**Generating Test Coverage Report**
To generate a test coverage report, run:
```
npm run test:coverage
```
This will generate a `coverage/` folder. Open the `index.html ` inside to view the report.

## File Structure

**config/**
Contains the configuration file for the application. All environment-specific
configurations are available here. Five environments are included by default:
* test: For running the test suite.
* local: For running on localhost.
* dev: For running on a remote server in a development environment.
* staging: For running on a remote server in a staging environment.
* prod: For running on a remote server in a production environment.

Environment can be selected by setting the NODE_ENV system environment variable.
An example for running the API in production mode on Linux-based machines is:
```
NODE_ENV=prod npm start
```

**documentation/**
Contains the documentation for the API. This is separate from the API controllers so it can be ran as an individual
microservice. This can also be moved into a separate Git repository to allow documentation to be commited without messing
up PRs and commit diffs.

**koa/**
Contains all the controllers and routes for the API. Logic is defined in the controllers and the routers map the logic
to endpoints.

**mongoose/**
Contains the Mongoose models. By default only a User model is included.

**passport/**
Contains the Passport strategies for the application's authentication.
By default only the Bearer strategy is included. The Bearer strategy allows
basic token-based authentication to any API endpoint.

**redis/**
Contains all the code for interacting with Redis such as generating API tokens.

**socketIo/**
Contains the logic for Socket.IO. Includes an authentication controller so users
can associate their socket with their identity, allowing identity-based push messages.

**test/**
All tests are included here. The test suite uses Mocha and Chai.

## Support
Any questions or concerns, please feel free to email me at appellod@gmail.com.
If you find any issues with the application, you can either email me or submit
a pull request and I'll be sure to address the issue!
