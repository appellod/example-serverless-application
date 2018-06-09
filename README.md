# Simple RESTful API
This is an open-source RESTful API designed to give Typescript developers a solid
starting point for creating backend applications.

## Features

**No Abstractions**  
Many other frameworks require you to install their package globally and include
many functions specific to their application. Sometimes it can take just as long
to learn a new framework as just learning how to set up your own API. This API
does not hide anything or abstract functionality away from the user. All code
is included in the project and can be modified to fit the user's needs.

**Passport**  
Authentication is performed using Passport. The default authentication strategy
is the Bearer strategy which allows basic token-based authentication. Other
Passport strategies such as Facebook or Google authentication can easily be
added if needed.

**Login and Account Recovery**  
Signup, login, and logout endpoints are provided without any configuration required.
A two-step password recovery process is also included. A user can request a password
reset which will email the user a link to enter a new password. Signup, login,
logout, and password recovery endpoints include full test coverage.

**Token-Based Authentication**  
Any route can be protected by token-based authentication. Any request to a
secured route must include a valid access token in the Authorization HTTP
header. The token will then be matched to a user and made accessible within
controllers via the *req.user* variable. Tokens expire after 30 days. Any invalid
tokens will receive a 401 Unauthorized HTTP response.

**API Documentation Generator**  
The API uses ApiDoc to generate API documentation based on in-line comments
before each API endpoint. Full documentation is included for all authentication
endpoints such as signup, login and logout. Documentation is easily updated
using a single command. Documentation also requires that a user logs in to
view the documentation, providing security for sensitive information.

**Socket.IO Authentication and User-based Broadcasting**  
Users can connect to Socket.IO and authenticate their connection. This allows us to send
them push notifications based on their identity. Supports multiple connection from a single user. 

**Easy Test Suite**  
Included test suite is ready to test any model or controller in your application.
Tests are performed using Mocha. All database collections are cleared before
each test to make sure that every test uses fresh data. Helper method is
included for easily testing both secured and unsecured API endpoints.

**End-to-End API Tests**  
Included test suite performs end-to-end testing on all API routes.

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

**Run MongoDB with Docker Compose**  
You can start up any development dependencies such as MongoDB using:
```
docker-compose up
```

**Compile Typescript with Grunt**  
The Typescript included within the src/ directory needs to be compiled before being run. To do this, we will
run the following command:
```
npm run build
```
This will compile all the Typescript within the src/ directory into a dist/ directory. 

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
NODE_ENV=local npm run migrations:run
```
This will run all migrations on the environment specified by NODE_ENV (local in this example). Migrations will be saved 
to the schemaMigrations collection within MongoDB.

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

**express/**  
Contains all the controllers and routes for the API. Logic is defined in the controllers and the routers map the logic
to endpoints.

**mongoose/**  
Contains the Mongoose models. By default only a User model is included.

**passport/**  
Contains the Passport strategies for the application's authentication.
By default only the Bearer strategy is included. The Bearer strategy allows
basic token-based authentication to any API endpoint.

**socketIo/**  
Contains the logic for Socket.IO. Includes an authentication controller so users
can associate their socket with their identity, allowing identity-based push messages.

**test/**  
All tests are included here. The test suite uses Mocha and Chai.

## Support
Any questions or concerns, please feel free to email me at appellod@gmail.com.
If you find any issues with the application, you can either email me or submit
a pull request and I'll be sure to address the issue!
